using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineTrack.api.Migrations
{
    /// <inheritdoc />
    public partial class RemovingPoster : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Movie_Poster",
                table: "watchListItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Movie_Poster",
                table: "watchListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
