using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderParams
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string OrderUserId { get; set; }

        public DateTime OrderTime { get; set; }

        public int FoodMenuId { get; set; }

        public int LocationId { get; set; }

        public int TasteId { get; set; }

        public string Comment { get; set; }

        public string UserId { get; set; }

        public decimal Amount { get; set; }

        public int? FoodOrderId { get; set; }

        public DateTime CreateTime { get; set; }

        public ApplicationUser OrderUser { get; set; }

        public FoodMenu FoodMenu { get; set; }

        public Location Location { get; set; }

        public FoodOrderPayment Payment { get; set; }

        public TasteType Taste { get; set; }

        public FoodOrderClientInfo ClientInfo { get; set; }

        public List<AccountDetails> AccountDetails { get; set; }
    }
}
