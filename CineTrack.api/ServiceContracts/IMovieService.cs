using CineTrack.api.Dtos;
using CineTrack.api.Models;

namespace CineTrack.api.ServiceContracts;

public interface IMovieService
{
    Task<MovieApiResponse> GetTrendingMoviesAsync();
    Task<MovieApiResponse> SearchMoviesAsync(string query, int page = 1);
    Task<MovieDetailsDto> GetMovieDetailsAsync(int movieId);
}
