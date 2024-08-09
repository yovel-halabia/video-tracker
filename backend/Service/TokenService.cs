using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Dtos.Token;
using backend.Interfaces;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        private readonly JwtSecurityTokenHandler _tokenHandler;

        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _tokenHandler = new JwtSecurityTokenHandler();
        }
        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var token = _tokenHandler.CreateToken(tokenDescriptor);

            return _tokenHandler.WriteToken(token);
        }


        public bool IsValidToken(string token)
        {
            try
            {
                if (token == null) return false;

                _tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;

            }
            catch
            {
                return false;
            }
        }


        public DecodedTokenDto DecodeToken(string token)
        {
            var decodedToken = _tokenHandler.ReadToken(token) as JwtSecurityToken;
            var userName = decodedToken.Claims.First(claim => claim.Type == "given_name").Value;
            var email = decodedToken.Claims.First(claim => claim.Type == "email").Value;

            if (userName == null || email == null) return new DecodedTokenDto();

            return new DecodedTokenDto()
            {
                UserName = userName,
                Email = email,
            };
        }
    }
}