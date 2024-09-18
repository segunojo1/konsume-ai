using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DaticianProj.Migrations
{
    /// <inheritdoc />
    public partial class ini : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "VerificationCodes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId",
                table: "VerificationCodes",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 47, 47, 895, DateTimeKind.Utc).AddTicks(9414));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 47, 47, 715, DateTimeKind.Utc).AddTicks(3949));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 47, 47, 715, DateTimeKind.Utc).AddTicks(3958));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 47, 47, 715, DateTimeKind.Utc).AddTicks(3959));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 9, 18, 7, 47, 47, 715, DateTimeKind.Utc).AddTicks(4089), "$2a$10$lWXkKgs4Ctb0kb5rC6ny7OWfa2yUthCxfe.rtNAy4LxJ/X4vOUt6." });

            migrationBuilder.CreateIndex(
                name: "IX_VerificationCodes_RestaurantId",
                table: "VerificationCodes",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_VerificationCodes_Restaurants_RestaurantId",
                table: "VerificationCodes",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VerificationCodes_Restaurants_RestaurantId",
                table: "VerificationCodes");

            migrationBuilder.DropIndex(
                name: "IX_VerificationCodes_RestaurantId",
                table: "VerificationCodes");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "VerificationCodes");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "VerificationCodes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 39, 34, 465, DateTimeKind.Utc).AddTicks(6811));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 39, 34, 381, DateTimeKind.Utc).AddTicks(2074));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 39, 34, 381, DateTimeKind.Utc).AddTicks(2085));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2024, 9, 18, 7, 39, 34, 381, DateTimeKind.Utc).AddTicks(2087));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "Password" },
                values: new object[] { new DateTime(2024, 9, 18, 7, 39, 34, 381, DateTimeKind.Utc).AddTicks(2320), "$2a$10$1lXlfQmHMEkBAXHpDclQrulKhBpVoJxKGW2PyhWT9I.anMHvdydWi" });
        }
    }
}
