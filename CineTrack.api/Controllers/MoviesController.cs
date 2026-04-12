using CineTrack.api.Dtos;
using CineTrack.api.Models;
using CineTrack.api.ServiceContracts;
using Microsoft.AspNetCore.Mvc;

namespace CineTrack.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMovieService movieService;
    public MoviesController(IMovieService movieService)
    {
        this.movieService = movieService;
    }

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingMoviesAsync()
    {
        var response = await movieService.GetTrendingMoviesAsync();
        return Ok(response);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchMoviesAsync(string query, int page = 1)
    {
        var response = await movieService.SearchMoviesAsync(query, page);
        return Ok(response);
    }

    [HttpGet("get-movie-details/{movieId}")]
    public async Task<IActionResult> GetMovieDetailsAsync(int movieId)
    {
        var response = await movieService.GetMovieDetailsAsync(movieId);
        return Ok(response);
    }
}
