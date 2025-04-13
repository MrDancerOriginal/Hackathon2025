using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShelterService.Migrations
{
    /// <inheritdoc />
    public partial class ChangeIntToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Animals_Shelters_ShelterId",
                table: "Animals");

            migrationBuilder.DropIndex(
                name: "IX_Animals_ShelterId",
                table: "Animals");

            migrationBuilder.AlterColumn<string>(
                name: "ShelterId",
                table: "Animals",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ShelterId1",
                table: "Animals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Animals_ShelterId1",
                table: "Animals",
                column: "ShelterId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Animals_Shelters_ShelterId1",
                table: "Animals",
                column: "ShelterId1",
                principalTable: "Shelters",
                principalColumn: "ShelterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Animals_Shelters_ShelterId1",
                table: "Animals");

            migrationBuilder.DropIndex(
                name: "IX_Animals_ShelterId1",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "ShelterId1",
                table: "Animals");

            migrationBuilder.AlterColumn<int>(
                name: "ShelterId",
                table: "Animals",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Animals_ShelterId",
                table: "Animals",
                column: "ShelterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Animals_Shelters_ShelterId",
                table: "Animals",
                column: "ShelterId",
                principalTable: "Shelters",
                principalColumn: "ShelterId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
