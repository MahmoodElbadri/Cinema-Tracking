import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { MovieService } from '../services/movie.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map, switchMap, finalize } from 'rxjs';
import { WatchlistResponse } from '../models/watchlist-response';
import { MovieDetailsDto } from '../models/movie-details-dto';

interface DetailedWatchlist {
  watchlistInfo: WatchlistResponse;
  movieDetails: MovieDetailsDto;
}

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
  protected detailedWatchlist = signal<DetailedWatchlist[]>([]);
  protected isLoading = signal<boolean>(true);

  private watchlistService = inject(WatchlistService);
  private movieService = inject(MovieService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getWatchlistWithDetails();
  }

  getWatchlistWithDetails() {
    this.isLoading.set(true);
    
    this.watchlistService.getWatchlist().pipe(
      switchMap(watchlistItems => {
        if (!watchlistItems || watchlistItems.length === 0) {
           return [[]];
        }
        
        const detailRequests = watchlistItems.map(item => 
          this.movieService.getMovieDetailsObservable(item.tmdbMovieId).pipe(
            map(details => ({ watchlistInfo: item, movieDetails: details } as DetailedWatchlist))
          )
        );
        return forkJoin(detailRequests);
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (combinedItems: DetailedWatchlist[] | any[]) => {
        this.detailedWatchlist.set(combinedItems);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to load watchlist details');
      }
    });
  }

  removeMovie(movieId: number) {
    this.watchlistService.removeMovieFromWatchlist(movieId).subscribe({
      next: () => {
        this.toastr.success('Movie removed from watchlist');
        this.detailedWatchlist.update(items => 
          items.filter(item => item.watchlistInfo.tmdbMovieId !== movieId)
        );
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to remove movie from watchlist');
      }
    });
  }

  markAsWatched(movieId: number) {
    this.detailedWatchlist.update(items => 
      items.map(item => {
        if (item.watchlistInfo.tmdbMovieId === movieId) {
          return { ...item, watchlistInfo: { ...item.watchlistInfo, isWatched: true } };
        }
        return item;
      })
    );
    this.toastr.success('Marked as watched!');
  }
}
