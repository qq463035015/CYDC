using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace cydc.Migrations
{
    public partial class AddCreateTimeAtFoodMenu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_AccountDetails_ApplicationUser_UserId", table: "AccountDetails");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_FoodMenu_FoodMenuId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_Location_LocationId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_ApplicationUser_OrderUserId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_TasteType_TasteId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrderClientInfo_FoodOrder_FoodOrderId", table: "FoodOrderClientInfo");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrderPayment_FoodOrder_FoodOrderId", table: "FoodOrderPayment");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "FoodMenu",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
            migrationBuilder.AddForeignKey(
                name: "FK_AccountDetails_ApplicationUser_UserId",
                table: "AccountDetails",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_FoodMenu_FoodMenuId",
                table: "FoodOrder",
                column: "FoodMenuId",
                principalTable: "FoodMenu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_Location_LocationId",
                table: "FoodOrder",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_ApplicationUser_OrderUserId",
                table: "FoodOrder",
                column: "OrderUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_TasteType_TasteId",
                table: "FoodOrder",
                column: "TasteId",
                principalTable: "TasteType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrderClientInfo_FoodOrder_FoodOrderId",
                table: "FoodOrderClientInfo",
                column: "FoodOrderId",
                principalTable: "FoodOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrderPayment_FoodOrder_FoodOrderId",
                table: "FoodOrderPayment",
                column: "FoodOrderId",
                principalTable: "FoodOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_AccountDetails_ApplicationUser_UserId", table: "AccountDetails");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_FoodMenu_FoodMenuId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_Location_LocationId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_ApplicationUser_OrderUserId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrder_TasteType_TasteId", table: "FoodOrder");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrderClientInfo_FoodOrder_FoodOrderId", table: "FoodOrderClientInfo");
            migrationBuilder.DropForeignKey(name: "FK_FoodOrderPayment_FoodOrder_FoodOrderId", table: "FoodOrderPayment");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.DropColumn(name: "CreateTime", table: "FoodMenu");
            migrationBuilder.AddForeignKey(
                name: "FK_AccountDetails_ApplicationUser_UserId",
                table: "AccountDetails",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_FoodMenu_FoodMenuId",
                table: "FoodOrder",
                column: "FoodMenuId",
                principalTable: "FoodMenu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_Location_LocationId",
                table: "FoodOrder",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_ApplicationUser_OrderUserId",
                table: "FoodOrder",
                column: "OrderUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrder_TasteType_TasteId",
                table: "FoodOrder",
                column: "TasteId",
                principalTable: "TasteType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrderClientInfo_FoodOrder_FoodOrderId",
                table: "FoodOrderClientInfo",
                column: "FoodOrderId",
                principalTable: "FoodOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_FoodOrderPayment_FoodOrder_FoodOrderId",
                table: "FoodOrderPayment",
                column: "FoodOrderId",
                principalTable: "FoodOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
