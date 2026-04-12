import { Component, signal } from '@angular/core';
import { WatchlistResponse } from '../models/watchlist-response';
import { WatchlistService } from '../services/watchlist.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieCardComponent, CommonModule, RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
markAsWatched(arg0: number) {
throw new Error('Method not implemented.');
}
  //variables
  protected watchlist = signal<WatchlistResponse[]>([]);
  protected isLoading = signal<boolean>(true);

  //injections
  private watchlistService = inject(WatchlistService);
  private toastr = inject(ToastrService);

  //methods
  ngOnInit(): void {
    this.getWatchlist();
  }

  getWatchlist() {
    this.isLoading.set(true);
    this.watchlistService.getWatchlist().subscribe({
      next: (response) => {
        this.watchlist.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      },
    });
  }
  removeMovie(movieId: number) {
    this.watchlistService.removeMovieFromWatchlist(movieId).subscribe({
      next: (response) => {
        this.toastr.success('Movie removed from watchlist');
        this.watchlist.update((movies) => {
          return movies.filter((movie) => movie.tmdbMovieId !== movieId);
        });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Failed to remove movie from watchlist');
      },
    });
  }
}
