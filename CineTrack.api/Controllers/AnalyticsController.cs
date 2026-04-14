using System.Security.Claims;
using CineTrack.api.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CineTrack.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;
    public AnalyticsController(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }
    // GET
    [Authorize]
    [HttpGet("get-user-analytics")]
    public async Task<IActionResult> GetUserAnalyticsAsync()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        var response = await _analyticsService.GetUserAnalyticsAsync(userId);
        return Ok(response);
    }
}