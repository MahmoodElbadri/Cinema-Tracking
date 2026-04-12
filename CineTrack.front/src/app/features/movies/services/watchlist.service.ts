import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WatchlistResponse } from '../models/watchlist-response';
import { WatchlistAddDto } from '../models/watchlist-add-dto';


@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  //variables
  private apiUrl = environment.apiUrl;
  public watchlist = signal<WatchlistResponse[]>([]);

  //injections
  private http = inject(HttpClient);

  //[HttpPost("add-movie-to-watchlist")]
  //public async Task<IActionResult> AddMovieToWatchlist(WatchlistAddDto dto)
  addMovieToWatchlist(watchlistAddDto: WatchlistAddDto){
    const url = `${this.apiUrl}/watchlists/add-movie-to-watchlist`;
    return this.http.post(url, watchlistAddDto);
  }


  
  // [HttpGet("get-watchlist")]
  // public async Task<IActionResult> GetWatchlistAsync()
  getWatchlist(){
    const url = `${this.apiUrl}/watchlists/get-watchlist`;
    return this.http.get<WatchlistResponse[]>(url);
  }


  // [HttpDelete("remove-movie-from-watchlist/{movieId}")] 
  // public async Task<IActionResult> RemoveMovieFromWatchlist(int movieId)
  removeMovieFromWatchlist(movieId: number){
    const url = `${this.apiUrl}/watchlists/remove-movie-from-watchlist/${movieId}`;
    return this.http.delete(url);
  }
  
}
