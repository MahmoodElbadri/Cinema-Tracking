using CineTrack.api.Data;
using CineTrack.api.Dtos;
using CineTrack.api.Models;
using CineTrack.api.ServiceContracts;
using Microsoft.EntityFrameworkCore;

namespace CineTrack.api.Services;

public class WatchlistService : IWatchlistService
{
    private readonly ApplicationDbContext _db;
    private readonly IMovieService _movieService;

    public WatchlistService(ApplicationDbContext db, IMovieService movieService)
    {
        this._db = db;
        this._movieService = movieService;
    }
    public async Task AddMovieToWatchlistAsync(WatchlistAddDto dto, string userId)
    {
        // 1. تشيك إن الفيلم مش موجود أصلاً في قائمة اليوزر ده عشان نمنع التكرار
        var isExist = await _db.watchListItems
            .AnyAsync(w => w.TmdbMovieId == dto.MovieId && w.UserId == userId);

        if (isExist)
            throw new Exception("Movie is already in your watchlist!"); // أو ممكن ترجع Custom Response

        // 2. نحفظ على طول من غير ما نكلم TMDB
        var watchlistItem = new WatchListItem
        {
            MovieTitle = dto.MovieTitle,
            TmdbMovieId = dto.MovieId,
            UserId = userId,
            AddedAt = DateTime.Now,
            IsWatched = false
        };

        _db.watchListItems.Add(watchlistItem);
        await _db.SaveChangesAsync();
    }

    public async Task RemoveMovieFromWatchlistAsync(int movieId, string userId)
    {
        // 3. نستخدم FirstOrDefaultAsync عشان الأداء
        var movie = await _db.watchListItems
            .FirstOrDefaultAsync(w => w.TmdbMovieId == movieId && w.UserId == userId);

        if (movie == null)
            throw new Exception("Movie not found in watchlist");

        _db.watchListItems.Remove(movie);
        await _db.SaveChangesAsync();
    }

    public async Task<List<WatchlistItemDto>> GetAllWatchlistsAsync(string userId)
    {
        // 4. تركة أداء: نعمل Select (Projection) قبل ToListAsync 
        // عشان الداتابيز ترجع الداتا اللي محتاجينها بس بدل ما ترجع الـ Row كله
        return await _db.watchListItems
            .Where(w => w.UserId == userId)
            .Select(tmp => new WatchlistItemDto
            {
                Id = tmp.Id,
                UserId = tmp.UserId,
                TmdbMovieId = tmp.TmdbMovieId,
                MovieTitle = tmp.MovieTitle,
                AddedAt = tmp.AddedAt,
                IsWatched = tmp.IsWatched,
                Poster = tmp.Movie_Poster
            }).ToListAsync();
    }
}

