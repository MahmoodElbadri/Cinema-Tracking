import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { MovieApiResponse } from '../../../core/models/MovieApiResponse';
import { Movie } from '../../../core/models/movie';
import { WatchlistService } from '../services/watchlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  //variables
  protected movies = computed(() => {
    return this.movieService.trendingMovies()?.results ?? [];
  });
  //injections
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);
  private toastr = inject(ToastrService);

  //methods
  ngOnInit() {
    this.movieService.getTrendingMovies();
  }

  addToWatchlist(movieId: number, movieTitle: string) {
    this.watchlistService.addMovieToWatchlist({ movieId, movieTitle }).subscribe({
      next: () => {
        this.toastr.success('Movie added to watchlist');
      },
      error: (error) => {
        console.log(error.error);
        this.toastr.error('Failed to add movie, or it is already in your list!');
      },
    });
  }

  viewMovieDetails(movieId: number) {
    this.movieService.getMovieDetails(movieId);
  }
}
