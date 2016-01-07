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
    }
}
