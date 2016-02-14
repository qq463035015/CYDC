using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace cydc.Models
{
    public class FoodOrder
    {
        public FoodOrder()
        {
            AccountDetails = new List<AccountDetails>();
        }

        public int Id { get; set; }

        [Required]
        public string OrderUserId { get; set; }

        public DateTime OrderTime { get; set; }

        public int FoodMenuId { get; set; }

        public int LocationId { get; set; }

        public int TasteId { get; set; }

        [MaxLength(100)]
        public string Comment { get; set; }

        public ApplicationUser OrderUser { get; set; }

        public FoodMenu FoodMenu { get; set; }

        public Location Location { get; set; }

        public FoodOrderPayment Payment { get; set; }

        public TasteType Taste { get; set; }

        public FoodOrderClientInfo ClientInfo { get; set; }

        public List<AccountDetails> AccountDetails { get; set; }
    }
}
