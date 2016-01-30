using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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

        public FileStreamResult ExcelFile(Stream stream, string filename)
        {
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
        }

        public const string Admin = "Admin";

        public readonly string[] AdminUsers = new[] { "周杰", "文旺", "赵玲" };
    }
}
