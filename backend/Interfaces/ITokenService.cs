using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.User;
using backend.Models;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);

        bool IsValidToken(string token);

        UserDto DecodeToken(string token);
    }
}