using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using cydc.Models;
using cydc.Services;

namespace cydc.Controllers
{
    [Authorize]
    public class AccountController : CydcBaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ApplicationDbContext _applicationDbContext;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ApplicationDbContext applicationDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<ActionResult> Login([FromBody]string username, [FromBody]string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            return HttpNotFound();
        }

        private async Task<ApplicationUser> FindUserByNameOrEmail(string userNameOrEmail)
        {
            ApplicationUser user;

            user = await _userManager.FindByNameAsync(userNameOrEmail);
            if (user != null) return user;

            user = await _userManager.FindByEmailAsync(userNameOrEmail);
            if (user != null) return user;

            return null;
        }
    }
}
