namespace CineTrack.api.Models;

public class Purchase
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int TmdbMovieId { get; set; }
    public string MovieTitle { get; set; }
    public decimal Price { get; set; }
    public string StripeSessionId { get; set; }
    public string PaymentStatus { get; set; } = "Pending"; // Pending, Completed, Failed
    public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
}
