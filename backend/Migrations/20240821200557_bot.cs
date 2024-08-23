using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KONSUME.Migrations
{
    /// <inheritdoc />
    public partial class bot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserInteractions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_UserInteractions_UserId",
                table: "UserInteractions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInteractions_Users_UserId",
                table: "UserInteractions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInteractions_Users_UserId",
                table: "UserInteractions");

            migrationBuilder.DropIndex(
                name: "IX_UserInteractions_UserId",
                table: "UserInteractions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserInteractions");

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 6, 23, 23, 1, 17, 309, DateTimeKind.Utc).AddTicks(9142));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 6, 23, 23, 1, 17, 221, DateTimeKind.Utc).AddTicks(3123));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 6, 23, 23, 1, 17, 221, DateTimeKind.Utc).AddTicks(3141));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 6, 23, 23, 1, 17, 221, DateTimeKind.Utc).AddTicks(3407), "$2a$10$rHOMkUO/gJC2449VWtzjeea4K9RFQLijYNawY8lw6m73LrBHk6I9e" });
        }
    }
}
