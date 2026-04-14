using CineTrack.api.Data;
using CineTrack.api.Dtos;
using CineTrack.api.ServiceContracts;

namespace CineTrack.api.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IMovieService _movieService;
    private readonly ApplicationDbContext _db;
    public AnalyticsService(IMovieService movieService, ApplicationDbContext db)
    {
        _movieService = movieService;
        _db = db;
    }
    public Task<UserAnalyticsDto> GetUserAnalyticsAsync(string userId)
    {
        var watchedMoviesIds = _db.watchListItems
            .Where(tmp=>tmp.UserId == userId && tmp.IsWatched)
            .Select(tmp=>tmp.TmdbMovieId)
            .ToList();
        
        //will call the api to get the genres of the watched movies
        var genres = new List<GenreStatDto>();
        foreach (var id in watchedMoviesIds)
        {
            var movie = _movieService.GetMovieDetailsAsync(id);
            genres.Add(movie.genres.Select(g=>new GenreStatDto{GenreName = g.Name, NumberOfMovies = 1}));
        }
            
    }
}