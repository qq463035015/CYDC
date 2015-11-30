using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace cydc.Controllers
{
    public class HomeController : CydcBaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
