using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Track;
using backend.Dtos.Video;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/track")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITrackRepository _trackRepo;

        public TrackController(IUserService userService, ITrackRepository trackRepository)
        {
            _userService = userService;
            _trackRepo = trackRepository;
        }


        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddTrack([FromBody] TrackToAddDto trackToAddDto)
        {
            try
            {

                if (!ModelState.IsValid) return BadRequest(ModelState);
                if (!trackToAddDto.Videos.IsValidVideoList()) return BadRequest(new { errors = new List<string> { "Video url must be unique for track" } });
                var accessToken = HttpContext.Request.Headers.First(h => h.Key == "Authorization").Value;
                User user = await _userService.GetAsync(accessToken);
                if (user == null) return Unauthorized();
                Track track = new Track()
                {
                    Label = trackToAddDto.Label,
                    ImgUrl = trackToAddDto.ImgUrl,
                    User = user,
                    UserId = user.Id
                };
                track.Videos = trackToAddDto.Videos.Select(v => v.FromVideoDto(track)).ToList();
                var result = await _trackRepo.CreateAsync(track);
                if (result != null) return Ok(new { trackId = result.Id });
                return StatusCode(500);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPost("edit")]
        public async Task<IActionResult> EditTrack([FromBody] TrackToEditDto trackToEditDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(new { errors = ModelState });
                if (trackToEditDto.Videos.Count > 0 && !trackToEditDto.Videos.IsValidVideoList()) return BadRequest(new { errors = new List<string> { "Video url must be unique for track" } });
                var AccessToken = HttpContext.Request.Headers.First(h => h.Key == "Authorization").Value;
                User user = await _userService.GetAsync(AccessToken);
                if (user == null) return Unauthorized();
                var result = await _trackRepo.UpdateAsync(trackToEditDto, user.Id);
                if (result != null) return Ok();
                return BadRequest(new { errors = new List<string> { "Invalid TrackId" } });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPost("edit-video")]
        public async Task<IActionResult> EditVideo([FromBody] VideoToEditDto videoToEditDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(new { errors = ModelState });
                var AccessToken = HttpContext.Request.Headers.First(h => h.Key == "Authorization").Value;
                User user = await _userService.GetAsync(AccessToken);
                if (user == null) return Unauthorized();
                var result = await _trackRepo.UpdateVideoAsync(videoToEditDto, user.Id);
                if (result != null) return Ok();
                return BadRequest(new { errors = new List<string> { "Invalid TrackId/Video Url" } });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteTrack([FromBody] int trackId)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var AccessToken = HttpContext.Request.Headers.First(h => h.Key == "Authorization").Value;
                User user = await _userService.GetAsync(AccessToken);
                if (user == null) return Unauthorized();
                var result = await _trackRepo.DeleteAsync(trackId, user.Id);
                if (result != null) return Ok();
                return BadRequest(new { errors = new List<string> { "Invalid TrackId" } });
            }
            catch
            {
                return StatusCode(500);
            }
        }


    }
}