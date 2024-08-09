using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Token;
using backend.Models;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);

        bool IsValidToken(string token);

        DecodedTokenDto DecodeToken(string token);
    }
}