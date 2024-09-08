using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KONSUME.Migrations
{
    /// <inheritdoc />
    public partial class AddMealRecommendationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MealRecommendations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProfileId = table.Column<int>(type: "integer", nullable: false),
                    DateSeed = table.Column<string>(type: "text", nullable: false),
                    Meals = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealRecommendations", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 22, 18, 25, 39, 665, DateTimeKind.Utc).AddTicks(3987));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 22, 18, 25, 39, 500, DateTimeKind.Utc).AddTicks(3466));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 8, 22, 18, 25, 39, 500, DateTimeKind.Utc).AddTicks(3485));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 8, 22, 18, 25, 39, 500, DateTimeKind.Utc).AddTicks(4121), "$2a$10$0Ureuq7zZb7og0QE9sNRJOFvldLv3FLKXn7Yc5De8zxszXFqWUogK" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealRecommendations");

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 21, 20, 5, 56, 680, DateTimeKind.Utc).AddTicks(6197));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 21, 20, 5, 56, 526, DateTimeKind.Utc).AddTicks(2380));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 8, 21, 20, 5, 56, 526, DateTimeKind.Utc).AddTicks(2395));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 8, 21, 20, 5, 56, 526, DateTimeKind.Utc).AddTicks(3150), "$2a$10$gK23LgQmdcIYznCPr/iare2PkicEoBIBXvCCtNXD34p0YH9NjvDmO" });
        }
    }
}
