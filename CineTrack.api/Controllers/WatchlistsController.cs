using CineTrack.api.Dtos;
using CineTrack.api.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CineTrack.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistsController(IWatchlistService _watchService) : ControllerBase
    {

        [HttpPost("add-movie-to-watchlist")]
        public async Task<IActionResult> AddMovieToWatchlist(WatchlistAddDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null) return Unauthorized();
            await _watchService.AddMovieToWatchlistAsync(dto, userId);
            return Ok(new { message = "Movie added to watchlist successfully" });
        }

        [HttpGet("get-watchlist")]
        public async Task<IActionResult> GetWatchlistAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null) return Unauthorized();
            var response = await _watchService.GetAllWatchlistsAsync(userId);
            return Ok(response);
        }

        [HttpDelete("remove-movie-from-watchlist/{movieId}")] 
        public async Task<IActionResult> RemoveMovieFromWatchlist(int movieId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            await _watchService.RemoveMovieFromWatchlistAsync(movieId, userId);
            return Ok(new { message = "Movie removed from watchlist successfully" });
        }
    }
}
