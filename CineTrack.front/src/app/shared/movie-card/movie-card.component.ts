import { Component, Input } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() movie!: Movie;

}
