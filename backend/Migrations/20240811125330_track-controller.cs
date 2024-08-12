using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class trackcontroller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Video_Tracks_TrackId",
                table: "Video");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ae19e5a3-5742-4a8b-80c5-8739f7f6d787");

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "Video",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Video",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tracks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ae3cc3dd-e756-4e2a-82e3-13854e5f26b1", null, "User", "USER" });

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_UserId",
                table: "Tracks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_AspNetUsers_UserId",
                table: "Tracks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Video_Tracks_TrackId",
                table: "Video",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_AspNetUsers_UserId",
                table: "Tracks");

            migrationBuilder.DropForeignKey(
                name: "FK_Video_Tracks_TrackId",
                table: "Video");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_UserId",
                table: "Tracks");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ae3cc3dd-e756-4e2a-82e3-13854e5f26b1");

            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Video");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tracks");

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "Video",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ae19e5a3-5742-4a8b-80c5-8739f7f6d787", null, "User", "USER" });

            migrationBuilder.AddForeignKey(
                name: "FK_Video_Tracks_TrackId",
                table: "Video",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id");
        }
    }
}
