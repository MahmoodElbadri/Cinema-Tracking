using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CineTrack.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistsController : ControllerBase
    {

    }
}
