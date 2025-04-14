using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShelterService.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoToShelter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Shelters",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Shelters");
        }
    }
}
