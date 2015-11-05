using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace cydc.Migrations
{
    public partial class InitialAddFoodOrderEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FoodMenu",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Details = table.Column<string>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodMenu", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "SiteNotice",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteNotice", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "TasteType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasteType", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "FoodOrder",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(nullable: true),
                    FoodMenuId = table.Column<int>(nullable: false),
                    LocationId = table.Column<int>(nullable: true),
                    OrderLocationId = table.Column<int>(nullable: false),
                    OrderTime = table.Column<DateTime>(nullable: false),
                    OrderUserId = table.Column<string>(nullable: false),
                    TasteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FoodOrder_FoodMenu_FoodMenuId",
                        column: x => x.FoodMenuId,
                        principalTable: "FoodMenu",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FoodOrder_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FoodOrder_ApplicationUser_OrderUserId",
                        column: x => x.OrderUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FoodOrder_TasteType_TasteId",
                        column: x => x.TasteId,
                        principalTable: "TasteType",
                        principalColumn: "Id");
                });
            migrationBuilder.CreateTable(
                name: "AccountDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(nullable: false),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    FoodOrderId = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountDetails_FoodOrder_FoodOrderId",
                        column: x => x.FoodOrderId,
                        principalTable: "FoodOrder",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AccountDetails_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });
            migrationBuilder.CreateTable(
                name: "FoodOrderClientInfo",
                columns: table => new
                {
                    FoodOrderId = table.Column<int>(nullable: false),
                    IP = table.Column<string>(nullable: false),
                    UserAgent = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodOrderClientInfo", x => x.FoodOrderId);
                    table.ForeignKey(
                        name: "FK_FoodOrderClientInfo_FoodOrder_FoodOrderId",
                        column: x => x.FoodOrderId,
                        principalTable: "FoodOrder",
                        principalColumn: "Id");
                });
            migrationBuilder.CreateTable(
                name: "FoodOrderPayment",
                columns: table => new
                {
                    FoodOrderId = table.Column<int>(nullable: false),
                    PayedTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodOrderPayment", x => x.FoodOrderId);
                    table.ForeignKey(
                        name: "FK_FoodOrderPayment_FoodOrder_FoodOrderId",
                        column: x => x.FoodOrderId,
                        principalTable: "FoodOrder",
                        principalColumn: "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("AccountDetails");
            migrationBuilder.DropTable("FoodOrderClientInfo");
            migrationBuilder.DropTable("FoodOrderPayment");
            migrationBuilder.DropTable("SiteNotice");
            migrationBuilder.DropTable("FoodOrder");
            migrationBuilder.DropTable("FoodMenu");
            migrationBuilder.DropTable("Location");
            migrationBuilder.DropTable("TasteType");
        }
    }
}
