using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Track;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Razor.Language;
using backend.Dtos.Video;
using backend.Data;

namespace backend.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDBContext _context;
        public SearchController(IConfiguration config, ITokenService tokenService, ApplicationDBContext context)
        {
            _config = config;
            _tokenService = tokenService;
            _context = context;
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetSearchResults([FromQuery] string query)
        {
            try
            {
                var accessToken = HttpContext.Request.Headers.First(h => h.Key == "Authorization").Value;
                var decodedToken = _tokenService.DecodeToken(accessToken);
                if (decodedToken == null) return Unauthorized();
                var user = await _context.Users.Where(u => u.Email == decodedToken.Email).FirstOrDefaultAsync();
                if (user == null) return Unauthorized();
                if (user.IsSearch == true) return BadRequest(new { errors = new List<string> { "request already sent" } });
                user.IsSearch = true;
                await _context.SaveChangesAsync();


                if (string.IsNullOrWhiteSpace(query)) return BadRequest(new { errors = new List<string> { "query must have value" } });
                var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = _config["YouTube:ApiKey"],
                    ApplicationName = this.GetType().ToString()
                });
                var searchListRequest = youtubeService.Search.List("snippet");
                searchListRequest.Q = query;
                searchListRequest.MaxResults = 20;

                var res = await searchListRequest.ExecuteAsync();
                var videos = res.Items.Select(item =>
                {
                    return new SearchVideoDto
                    {
                        VideoUrl = item.Id.VideoId,
                        Title = item.Snippet.Title,
                        ImgUrl = item.Snippet.Thumbnails.Default__.Url
                    };
                }).Where(v => v.VideoUrl != null).ToList().GetRange(0, 10);

                user = await _context.Users.Where(u => u.Email == decodedToken.Email).FirstOrDefaultAsync();
                user.IsSearch = false;
                await _context.SaveChangesAsync();
                return Ok(videos);


            }
            catch
            {
                return StatusCode(500);
            }
        }

    }
}