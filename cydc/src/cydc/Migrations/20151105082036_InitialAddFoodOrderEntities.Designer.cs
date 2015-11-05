using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using cydc.Models;

namespace cydc.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20151105082036_InitialAddFoodOrderEntities")]
    partial class InitialAddFoodOrderEntities
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Annotation("ProductVersion", "7.0.0-beta8-15964")
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .Annotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.Index("NormalizedName")
                        .Annotation("Relational:Name", "RoleNameIndex");

                    b.Annotation("Relational:TableName", "AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId");

                    b.HasKey("Id");

                    b.Annotation("Relational:TableName", "AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.Annotation("Relational:TableName", "AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.Annotation("Relational:TableName", "AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.Annotation("Relational:TableName", "AspNetUserRoles");
                });

            modelBuilder.Entity("cydc.Models.AccountDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<DateTime>("CreateTime");

                    b.Property<int?>("FoodOrderId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");
                });

            modelBuilder.Entity("cydc.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .Annotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .Annotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.Index("NormalizedEmail")
                        .Annotation("Relational:Name", "EmailIndex");

                    b.Index("NormalizedUserName")
                        .Annotation("Relational:Name", "UserNameIndex");

                    b.Annotation("Relational:TableName", "AspNetUsers");
                });

            modelBuilder.Entity("cydc.Models.FoodMenu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Details")
                        .IsRequired()
                        .Annotation("MaxLength", 50);

                    b.Property<bool>("Enabled");

                    b.Property<decimal>("Price");

                    b.Property<string>("Title")
                        .IsRequired()
                        .Annotation("MaxLength", 10);

                    b.HasKey("Id");
                });

            modelBuilder.Entity("cydc.Models.FoodOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment")
                        .Annotation("MaxLength", 100);

                    b.Property<int>("FoodMenuId");

                    b.Property<int?>("LocationId");

                    b.Property<int>("OrderLocationId");

                    b.Property<DateTime>("OrderTime");

                    b.Property<string>("OrderUserId")
                        .IsRequired();

                    b.Property<int>("TasteId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("cydc.Models.FoodOrderClientInfo", b =>
                {
                    b.Property<int>("FoodOrderId");

                    b.Property<string>("IP")
                        .IsRequired()
                        .Annotation("MaxLength", 15);

                    b.Property<string>("UserAgent")
                        .IsRequired();

                    b.HasKey("FoodOrderId");
                });

            modelBuilder.Entity("cydc.Models.FoodOrderPayment", b =>
                {
                    b.Property<int>("FoodOrderId");

                    b.Property<DateTime>("PayedTime");

                    b.HasKey("FoodOrderId");
                });

            modelBuilder.Entity("cydc.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .Annotation("MaxLength", 15);

                    b.HasKey("Id");
                });

            modelBuilder.Entity("cydc.Models.SiteNotice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content")
                        .IsRequired()
                        .Annotation("MaxLength", 500);

                    b.HasKey("Id");
                });

            modelBuilder.Entity("cydc.Models.TasteType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .Annotation("MaxLength", 10);

                    b.HasKey("Id");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .ForeignKey("RoleId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("cydc.Models.ApplicationUser")
                        .WithMany()
                        .ForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("cydc.Models.ApplicationUser")
                        .WithMany()
                        .ForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .ForeignKey("RoleId");

                    b.HasOne("cydc.Models.ApplicationUser")
                        .WithMany()
                        .ForeignKey("UserId");
                });

            modelBuilder.Entity("cydc.Models.AccountDetails", b =>
                {
                    b.HasOne("cydc.Models.FoodOrder")
                        .WithMany()
                        .ForeignKey("FoodOrderId");

                    b.HasOne("cydc.Models.ApplicationUser")
                        .WithMany()
                        .ForeignKey("UserId");
                });

            modelBuilder.Entity("cydc.Models.FoodOrder", b =>
                {
                    b.HasOne("cydc.Models.FoodMenu")
                        .WithMany()
                        .ForeignKey("FoodMenuId");

                    b.HasOne("cydc.Models.Location")
                        .WithMany()
                        .ForeignKey("LocationId");

                    b.HasOne("cydc.Models.ApplicationUser")
                        .WithMany()
                        .ForeignKey("OrderUserId");

                    b.HasOne("cydc.Models.TasteType")
                        .WithMany()
                        .ForeignKey("TasteId");
                });

            modelBuilder.Entity("cydc.Models.FoodOrderClientInfo", b =>
                {
                    b.HasOne("cydc.Models.FoodOrder")
                        .WithOne()
                        .ForeignKey("cydc.Models.FoodOrderClientInfo", "FoodOrderId");
                });

            modelBuilder.Entity("cydc.Models.FoodOrderPayment", b =>
                {
                    b.HasOne("cydc.Models.FoodOrder")
                        .WithOne()
                        .ForeignKey("cydc.Models.FoodOrderPayment", "FoodOrderId");
                });
        }
    }
}
