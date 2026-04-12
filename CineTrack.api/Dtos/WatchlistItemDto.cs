using CineTrack.api.Models;

namespace CineTrack.api.Dtos;

public class WatchlistItemDto
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int TmdbMovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.Now;
    public bool IsWatched { get; set; }
    public string Poster { get; set; }
}
