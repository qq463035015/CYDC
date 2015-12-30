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
            if (user == null) return HttpBadRequest("CANNOT_FIND_THE_USER");

            var passwordOk = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordOk) return HttpBadRequest("PASSWORD_NOT_OK");

            await _signInManager.SignInAsync(user, dto.RememberMe);
            return Ok();
        }

        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody] RegisterDto dto)
        {
            if (ModelState.IsValid)
            {
                var result = await _userManager.CreateAsync(new ApplicationUser
                {
                    UserName = dto.UserName, 
                    Email = dto.Email
                }, dto.Password);
                
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return HttpBadRequest(result.Errors);
                }
            }
            else
            {
                return HttpBadRequest(ModelState);
            }
        }

        [AllowAnonymous]
        public async Task<ActionResult> CheckUserName(string username)
        {
            var result = await _userManager.FindByNameAsync(username);
            return Json(result == null);
        }

        [AllowAnonymous]
        public async Task<ActionResult> CheckEmail(string email)
        {
            var result = await _userManager.FindByEmailAsync(email);
            return Json(result == null);
        }

        public ActionResult Hide()
        {
            return Content("这是一个隐藏的资源");
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
