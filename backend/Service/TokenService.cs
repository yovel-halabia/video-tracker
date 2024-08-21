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
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(System.Environment.GetEnvironmentVariable("SIGNING_KEY")));
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

        public DecodedTokenDto DecodeToken(string token)
        {
            try
            {
                _tokenHandler.ValidateToken(token.Replace("Bearer ", ""), new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var decodedToken = _tokenHandler.ReadToken(token.Replace("Bearer ", "")) as JwtSecurityToken;
                var userName = decodedToken.Claims.First(claim => claim.Type == "given_name").Value;
                var email = decodedToken.Claims.First(claim => claim.Type == "email").Value;

                if (userName == null || email == null) return null;

                return new DecodedTokenDto()
                {
                    UserName = userName,
                    Email = email,
                };
            }
            catch
            {
                return null;
            }
        }
    }
}