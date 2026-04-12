import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieApiResponse } from '../../../core/models/MovieApiResponse';
import { MovieDetailsDto } from '../models/movie-details-dto';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //variables
  private apiUrl = environment.apiUrl;
  public trendingMovies = signal<MovieApiResponse>({} as MovieApiResponse);
  public movieDetails = signal<MovieDetailsDto>({} as MovieDetailsDto);

  //injections
  private http = inject(HttpClient);

  //methods
  //MoviesController -> [HttpGet("trending")]
  getTrendingMovies(){
    return this.http.get<MovieApiResponse>(`${this.apiUrl}/movies/trending`)
    .subscribe({
      next: (response) => {
        this.trendingMovies.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //MoviesController -> [HttpGet("get-movie-details/{movieId}")]
  getMovieDetails(movieId: number){
    return this.http.get<MovieDetailsDto>(`${this.apiUrl}/movies/get-movie-details/${movieId}`)
    .subscribe({
      next: (response) => {
        this.movieDetails.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
