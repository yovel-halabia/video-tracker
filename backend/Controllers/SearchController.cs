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
        private readonly ITokenService _tokenService;
        private readonly ApplicationDBContext _context;
        public SearchController(ITokenService tokenService, ApplicationDBContext context)
        {
            Console.WriteLine(System.Environment.GetEnvironmentVariable("YT_API_KEY"));
            _tokenService = tokenService;
            _context = context;
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetSearchResults([FromQuery] string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query)) return BadRequest(new { errors = new List<string> { "query must have value" } });
                var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = System.Environment.GetEnvironmentVariable("YT_API_KEY"),
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
                return Ok(videos);


            }
            catch
            {
                return StatusCode(500);
            }
        }

    }
}