using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models.Excel
{
    public class FoodOrderExcelDto
    {
        public string 用户名称 { get; set; }
        
        public string 点餐时间 { get; set; }
        
        public string 菜谱内容 { get; set; }
        
        public string 套餐 { get; set; }
        
        public string 口味 { get; set; }
        
        public string 地点 { get; set; }
        
        public string 备注 { get; set; }
        
        public decimal 金额 { get; set; }

        internal static IEnumerable<FoodOrderExcelDto> FromEntities(IEnumerable<FoodOrder> list)
        {
            return list.Select(r => new FoodOrderExcelDto
            {
                金额 = r.FoodMenu.Price,
                备注 = r.Comment,
                菜谱内容 = r.FoodMenu.Details,
                地点 = r.Location.Name,
                点餐时间 = r.OrderTime.ToString(),
                口味 = r.Taste.Name,
                套餐 = r.FoodMenu.Title,
                用户名称 = r.OrderUser.UserName,
            });
        }
    }
}
