using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Authorization;

namespace cydc.Controllers
{
    public class HomeController : CydcBaseController
    {
        [FromServices]
        public IHostingEnvironment HostingEnvironment { get; set; }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ENV()
        {
            return Content(HostingEnvironment.EnvironmentName);
        }

        public IActionResult Random()
        {
            return Content(Convert.ToBase64String(Guid.NewGuid().ToByteArray()));
        }

        public string Date()
        {
            return "2015-12-21";
        }
    }
}
