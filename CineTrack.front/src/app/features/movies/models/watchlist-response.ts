export interface WatchlistResponse {
    id: number;
    userId: number;
    tmdbMovieId: number;
    movieTitle: string;
    addedAt: Date;
    isWatched: boolean;
    poster: string;
}

/*
Id = tmp.Id,
                UserId = tmp.UserId,
                TmdbMovieId = tmp.TmdbMovieId,
                MovieTitle = tmp.MovieTitle,
                AddedAt = tmp.AddedAt,
                IsWatched = tmp.IsWatched,
                Poster = tmp.Movie_Poster*/