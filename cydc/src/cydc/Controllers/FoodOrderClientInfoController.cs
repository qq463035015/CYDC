using cydc.Models;
using Microsoft.AspNet.Http.Features;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodOrderClientInfoController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }
    }
}