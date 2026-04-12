import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { ToastrService } from 'ngx-toastr';
import { WatchlistAddDto } from '../models/watchlist-add-dto';
import { MovieDetailsDto } from '../models/movie-details-dto';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private watchlistService = inject(WatchlistService);
  private toastr = inject(ToastrService);
  private movieId!: number;
  
  protected movie = this.movieService.movieDetails;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieDetails();
    });
  }
  
  getMovieDetails(){
    this.movieService.getMovieDetails(this.movieId);
  }

  addToWatchlist(movieId: number, movieTitle: string) {
    const watchlistAddDto: WatchlistAddDto = {
      movieId: movieId,
      movieTitle: movieTitle
    };
    this.watchlistService.addMovieToWatchlist(watchlistAddDto).subscribe({
      next: () => {
        this.toastr.success('Movie added to watchlist');
      },
      error: (error) => {
        this.toastr.error(error.error);
      }
    });
  }

}
