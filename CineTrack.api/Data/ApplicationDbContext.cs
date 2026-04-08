using CineTrack.api.Models;
using Microsoft.EntityFrameworkCore;

namespace CineTrack.api.Data;

public class ApplicationDbContext:DbContext
{
    public DbSet<WatchListItem> watchListItems { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
