import { Component, input, output } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  public movie = input.required<Movie>();
  clikedMovieToAddToWatchlistToBseSentTEmitted = output<number>();

  addToWatchlist() {
    this.clikedMovieToAddToWatchlistToBseSentTEmitted.emit(this.movie().id);
  }
}
