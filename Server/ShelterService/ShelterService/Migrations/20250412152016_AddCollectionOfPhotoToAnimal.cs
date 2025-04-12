using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShelterService.Migrations
{
    /// <inheritdoc />
    public partial class AddCollectionOfPhotoToAnimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Animals");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalImages_AnimalId",
                table: "AnimalImages",
                column: "AnimalId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalImages_Animals_AnimalId",
                table: "AnimalImages",
                column: "AnimalId",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimalImages_Animals_AnimalId",
                table: "AnimalImages");

            migrationBuilder.DropIndex(
                name: "IX_AnimalImages_AnimalId",
                table: "AnimalImages");

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Animals",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
