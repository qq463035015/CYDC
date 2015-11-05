using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace cydc.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        public DbSet<AccountDetails> AccountDetails { get; set; }

        public DbSet<FoodMenu> FoodMenus { get; set; }

        public DbSet<FoodOrder> FoodOrders { get; set; }

        public DbSet<FoodOrderClientInfo> FoodOrderClientInfos { get; set; }

        public DbSet<FoodOrderPayment> FoodOrderPayments { get; set; }

        public DbSet<SiteNotice> SiteNotices { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<TasteType> TasteTypes { get; set; }
    }
}
