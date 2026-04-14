import { FavouriteGenre } from './FavouriteGenre';
import { MonthlyStat } from './MonthlyStat';

export interface UserAnalyticsDto {
  totalMovies: number;
  watchedMovies: number;
  totalWatchTimeMinutes: number;
  favouriteGenres: FavouriteGenre[];
  monthlyStats: MonthlyStat[];
}
