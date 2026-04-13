namespace CineTrack.api.Dtos;

public class UserAnalyticsDto
{
    public int TotalMovies { get; set; }
    public int  WatchedMovies { get; set; }
    public int TotalWatchTimeMinutes { get; set; }
    public List<GenreStatDto> FavouriteGenres { get; set; } = new List<GenreStatDto>();
    public List<MonthlyStatDto> MonthlyStats { get; set; } = new List<MonthlyStatDto>();
}