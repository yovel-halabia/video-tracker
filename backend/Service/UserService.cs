using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public UserService(UserManager<User> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<User> GetAsync(string token)
        {
            try
            {
                var decodedToken = _tokenService.DecodeToken(token);
                if (decodedToken == null) return null;
                User user = await _userManager.FindByEmailAsync(decodedToken.Email);
                return user;
            }
            catch
            {
                return null;
            }
        }
    }
}