using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    [Authorize]
    public class CydcBaseController : Controller
    {
        public static DateTime FormatDate(DateTime? dt)
        {
            return DateTime.Parse(dt?.ToString("yyyy-MM-dd"));
        }

        public const string Admin = "Admin";

        public readonly string[] AdminUsers = new[] { "周杰", "文旺", "赵玲" };
    }
}
