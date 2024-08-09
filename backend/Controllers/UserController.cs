using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.User;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using backend.Mappers;


namespace backend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var addRole = await _userManager.AddToRoleAsync(user, "User");
                    if (addRole.Succeeded) return Ok(new NewUserDto
                    {
                        UserName = user.UserName,
                        Token = _tokenService.CreateToken(user)
                    });
                    return StatusCode(500);

                }

                return Unauthorized(createUser.Errors.Select(e => e.Description).ToArray());


            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (user == null) return Unauthorized(new List<string>(["You have entered an invalid username or password"]));

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) return Unauthorized(new List<string>(["You have entered an invalid username or password"]));

                return Ok(new LoginUserDto
                {
                    UserName = user.UserName,
                    Tracks = user.Tracks.Select(t => t.ToTrackDto()).ToList(),
                    Token = _tokenService.CreateToken(user)
                });


            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {

                var accessToken = Request.Cookies["accessToken"];
                User user = await _userService.GetAsync(accessToken);
                if (user == null) return Unauthorized();

                await _signInManager.SignInAsync(user, true);
                return Ok(new UserDto
                {
                    UserName = user.UserName,
                    Tracks = user.Tracks.Select(t => t.ToTrackDto()).ToList(),
                });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                if (Request.Cookies["accessToken"] != null)
                {
                    HttpContext.Response.Cookies.Delete("AccessToken");
                }
                return Ok(new List<string>(["User logged out"]));
            }
            catch
            {
                return StatusCode(500);
            }


        }
    }
}