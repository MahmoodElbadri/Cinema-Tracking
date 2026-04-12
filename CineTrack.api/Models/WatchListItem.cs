namespace CineTrack.api.Models;

public class WatchListItem
{
    public int Id{ get; set; }
    public AppUser? User { get; set; }
    public string UserId { get; set; }
    public int  TmdbMovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.Now;
    public bool IsWatched { get; set; }
    public string  Movie_Poster { get; set; }
}
