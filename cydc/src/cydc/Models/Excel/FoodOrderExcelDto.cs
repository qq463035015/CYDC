using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models.Excel
{
    public class FoodOrderExcelDto
    {
        [Display(Name = "用户名称")]
        public string UserName { get; set; }

        [Display(Name = "点餐时间")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd hh:mm:ss}")]
        public DateTime OrderTime { get; set; }

        [Display(Name = "菜谱内容")]
        public string FoodDetails { get; set; }

        [Display(Name = "套餐")]
        public string FoodTitle { get; set; }

        [Display(Name = "口味")]
        public string Taste { get; set; }

        [Display(Name = "地点")]
        public string Location { get; set; }

        [Display(Name = "备注")]
        public string Comment { get; set; }

        internal static IEnumerable<FoodOrderExcelDto> FromEntities(IEnumerable<FoodOrder> list)
        {
            return list.Select(r => new FoodOrderExcelDto
            {
                Comment = r.Comment,
                FoodDetails = r.FoodMenu.Details,
                Location = r.Location.Name,
                OrderTime = r.OrderTime,
                Taste = r.Taste.Name,
                FoodTitle = r.FoodMenu.Title,
                UserName = r.OrderUser.UserName
            });
        }
    }
}
