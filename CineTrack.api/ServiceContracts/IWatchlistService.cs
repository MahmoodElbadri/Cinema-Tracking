using CineTrack.api.Dtos;
using CineTrack.api.Models;

namespace CineTrack.api.ServiceContracts;

public interface IWatchlistService
{
    Task AddMovieToWatchlistAsync(WatchlistAddDto dto, int userId);
    Task RemoveMovieFromWatchlistAsync(int movieId, int userId);
    Task<List<WatchlistItemDto>> GetAllWatchlistsAsync(int userId);
}
