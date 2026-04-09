import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieApiResponse } from '../../../core/models/MovieApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //variables
  private apiUrl = environment.apiUrl;
  public trendingMovies = signal<MovieApiResponse>({} as MovieApiResponse);

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
}
