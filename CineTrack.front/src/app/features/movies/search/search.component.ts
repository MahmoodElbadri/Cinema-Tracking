import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { WatchlistService } from '../services/watchlist.service';
import { ToastrService } from 'ngx-toastr';
import { MovieApiResponse } from '../../../core/models/MovieApiResponse';
import { MovieService } from '../services/movie.service';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  searchControl = new FormControl<string>('');
  searchMovies = signal<MovieApiResponse>({} as MovieApiResponse);

  //injections
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);
  private toastr = inject(ToastrService);


  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query)=>{
        if(!query || query.trim().length < 3){
          return of({} as MovieApiResponse);
        }
        return this.movieService.searchMovies(query);
      })
    ).subscribe((response)=>{
      this.searchMovies.set(response);
    })
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
}
