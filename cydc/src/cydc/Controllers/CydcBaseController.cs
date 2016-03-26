using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    [Authorize]
    public class CydcBaseController : Controller
    {
        public FileContentResult CsvFile(string csvString, string filename)
        {
            return File(Encoding.GetEncoding(936).GetBytes(csvString), "text/csv", filename);
        }

        public const string Admin = "Admin";

        public readonly string[] AdminUsers = new[] { "周杰", "文旺", "赵玲" };
    }
}
