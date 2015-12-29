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
using System.Net;

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

        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await TryFindUserByNameOrEmail(dto.UserName);
            if (user == null) return new HttpStatusCodeResult(401);

            var passwordOk = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordOk) return new HttpStatusCodeResult((int)HttpStatusCode.Forbidden);

            await _signInManager.SignInAsync(user, dto.RememberMe);
            return Ok();
        }

        private async Task<ApplicationUser> TryFindUserByNameOrEmail(string userNameOrEmail)
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
