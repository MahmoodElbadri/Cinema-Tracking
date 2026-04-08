namespace CineTrack.api.Models;

public class WatchListItem
{
    public int Id{ get; set; }
    public string UserId { get; set; }
    public int  TmdbMovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime AddedAt { get; set; }
    public bool IsWatched { get; set; }
}
