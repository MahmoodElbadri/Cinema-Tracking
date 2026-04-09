using CineTrack.api.Dtos;
using CineTrack.api.Models;

namespace CineTrack.api.ServiceContracts;

public interface IWatchlistService
{
    Task AddMovieToWatchlistAsync(WatchlistAddDto dto, string userId);
    Task RemoveMovieFromWatchlistAsync(int movieId, string userId);
    Task<List<WatchlistItemDto>> GetAllWatchlistsAsync(string userId);
}
