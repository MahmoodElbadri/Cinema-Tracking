import { Component, signal } from '@angular/core';
import { WatchlistResponse } from '../models/watchlist-response';
import { WatchlistService } from '../services/watchlist.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
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
  removeMovie(arg0: number) {
    throw new Error('Method not implemented.');
  }
}
