using CineTrack.api.Data;
using CineTrack.api.Dtos;
using CineTrack.api.ServiceContracts;
using Microsoft.EntityFrameworkCore;

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

    public async Task<UserAnalyticsDto> GetUserAnalyticsAsync(string userId)
    {
        var totalWatchedMovies = await _db.watchListItems.Where(tmp => tmp.UserId == userId ).CountAsync();
        var watchedMoviesIds = await _db.watchListItems
            .Where(tmp => tmp.UserId == userId && tmp.IsWatched)
            .Select(tmp => tmp.TmdbMovieId)
            .ToListAsync();

        if (!watchedMoviesIds.Any())
        {
            return new UserAnalyticsDto
            {
                FavouriteGenres = new List<GenreStatDto>(),
                TotalWatchTimeMinutes = 0,
                MonthlyStats = new List<MonthlyStatDto>()
            };
        }

        // شغل الـ API calls
        var movieTasks = watchedMoviesIds
            .Select(id => _movieService.GetMovieDetailsAsync(id))
            .ToList();

        var movies = await Task.WhenAll(movieTasks);

        // اجمع الـ Genres
        var genreGroups = movies
            .SelectMany(m => m.genres)
            .GroupBy(g => g.name)
            .Select(g => new GenreStatDto
            {
                GenreName = g.Key,
                NumberOfMovies = g.Count()
            })
            .OrderByDescending(g => g.NumberOfMovies)
            .ToList();

        // 🎯 MonthlyStats - الحل الصح
        var monthlyStats = await _db.watchListItems
            .Where(tmp => tmp.UserId == userId && tmp.IsWatched)
            .GroupBy(tmp => new { tmp.AddedAt.Year, tmp.AddedAt.Month })
            .Select(g => new MonthlyStatDto
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                MoviesAdded = g.Count()
            })
            .OrderBy(x => x.Year)
            .ThenBy(x => x.Month)
            .ToListAsync();

        return new UserAnalyticsDto
        {
            TotalMovies = totalWatchedMovies,
            WatchedMovies = watchedMoviesIds.Count,
            TotalWatchTimeMinutes = movies.Sum(m => m.runtime),
            FavouriteGenres = genreGroups,
            MonthlyStats = monthlyStats
        };
    }
}