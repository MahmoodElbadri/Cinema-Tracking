using CineTrack.api.Data;
using CineTrack.api.Dtos;
using CineTrack.api.ServiceContracts;

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
    public Task AddMovieToWatchlistAsync(WatchlistAddDto dto, int userId)
    {
        throw new NotImplementedException();
    }

    public Task<List<WatchlistItemDto>> GetAllWatchlistsAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task RemoveMovieFromWatchlistAsync(int movieId, int userId)
    {
        throw new NotImplementedException();
    }
}
