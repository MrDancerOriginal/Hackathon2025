using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShelterService.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Volunteers_VolunteerUserId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Volunteers_VolunteerUserId",
                table: "Requests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Volunteers",
                table: "Volunteers");

            migrationBuilder.DropIndex(
                name: "IX_Requests_VolunteerUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_VolunteerUserId",
                table: "Favorites");

            migrationBuilder.DropColumn(
                name: "VolunteerUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "VolunteerUserId",
                table: "Favorites");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Volunteers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "VolunteerId",
                table: "Volunteers",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "VolunteerId",
                table: "Requests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VolunteerId",
                table: "Favorites",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Volunteers",
                table: "Volunteers",
                column: "VolunteerId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_VolunteerId",
                table: "Requests",
                column: "VolunteerId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_VolunteerId",
                table: "Favorites",
                column: "VolunteerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Volunteers_VolunteerId",
                table: "Favorites",
                column: "VolunteerId",
                principalTable: "Volunteers",
                principalColumn: "VolunteerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Volunteers_VolunteerId",
                table: "Requests",
                column: "VolunteerId",
                principalTable: "Volunteers",
                principalColumn: "VolunteerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Volunteers_VolunteerId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Volunteers_VolunteerId",
                table: "Requests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Volunteers",
                table: "Volunteers");

            migrationBuilder.DropIndex(
                name: "IX_Requests_VolunteerId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_VolunteerId",
                table: "Favorites");

            migrationBuilder.DropColumn(
                name: "VolunteerId",
                table: "Volunteers");

            migrationBuilder.DropColumn(
                name: "VolunteerId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "VolunteerId",
                table: "Favorites");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Volunteers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "VolunteerUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VolunteerUserId",
                table: "Favorites",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Volunteers",
                table: "Volunteers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_VolunteerUserId",
                table: "Requests",
                column: "VolunteerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_VolunteerUserId",
                table: "Favorites",
                column: "VolunteerUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Volunteers_VolunteerUserId",
                table: "Favorites",
                column: "VolunteerUserId",
                principalTable: "Volunteers",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Volunteers_VolunteerUserId",
                table: "Requests",
                column: "VolunteerUserId",
                principalTable: "Volunteers",
                principalColumn: "UserId");
        }
    }
}
