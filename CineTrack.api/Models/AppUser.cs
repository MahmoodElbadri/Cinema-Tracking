using Microsoft.AspNetCore.Identity;

namespace CineTrack.api.Models;

public class AppUser : IdentityUser
{
    public string? Fullname { get; set; }
}
