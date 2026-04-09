import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from "../../../shared/movie-card/movie-card.component";
import { MovieApiResponse } from '../../../core/models/MovieApiResponse';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  //variables
  protected movies = computed(()=>{
    return this.movieService.trendingMovies()?.results ?? [];
  })
  //injections
  private movieService = inject(MovieService);

  //methods
  ngOnInit() {
   this.movieService.getTrendingMovies();
  }


}
