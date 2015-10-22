using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class UIController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public string Test()
        {
            return new Guid().ToString();
        }
    }
}
