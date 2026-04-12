using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineTrack.api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingWatchListItemModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Movie_Poster",
                table: "watchListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Movie_Poster",
                table: "watchListItems");
        }
    }
}
