export interface WatchlistResponse {
    id: number;
    userId: number;
    tmdbMovieId: number;
    movieTitle: string;
    addedAt: Date;
    isWatched: boolean;
}
