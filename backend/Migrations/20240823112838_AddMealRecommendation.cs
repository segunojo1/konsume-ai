using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KONSUME.Migrations
{
    /// <inheritdoc />
    public partial class AddMealRecommendation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyFat",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "NoOfMealPerDay",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "SnackPreference",
                table: "Profiles");

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 23, 11, 28, 38, 327, DateTimeKind.Utc).AddTicks(5852));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 8, 23, 11, 28, 38, 252, DateTimeKind.Utc).AddTicks(7425));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 8, 23, 11, 28, 38, 252, DateTimeKind.Utc).AddTicks(7435));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 8, 23, 11, 28, 38, 252, DateTimeKind.Utc).AddTicks(7588), "$2a$10$Tjg7xuIPiLJlKT2oYLLMQemAQiBOMPe4UYDrlSob2HKrVDGk0I/mO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BodyFat",
                table: "Profiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoOfMealPerDay",
                table: "Profiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SnackPreference",
                table: "Profiles",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BodyFat", "DateCreated", "NoOfMealPerDay", "SnackPreference" },
                values: new object[] { null, new DateTime(2024, 8, 22, 18, 25, 39, 665, DateTimeKind.Utc).AddTicks(3987), null, null });

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
    }
}
