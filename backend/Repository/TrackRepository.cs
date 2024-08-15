using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Track;
using backend.Dtos.Video;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class TrackRepository : ITrackRepository
    {
        private readonly ApplicationDBContext _context;
        public TrackRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Track> CreateAsync(Track track)
        {
            try
            {
                await _context.Tracks.AddAsync(track);
                await _context.SaveChangesAsync();

                return track;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public async Task<TrackToEditDto> UpdateAsync(TrackToEditDto trackToEditDto, string userId)
        {
            try
            {
                var existingTrack = await _context.Tracks.Where(t => t.UserId == userId && t.Id == trackToEditDto.Id).Include(c => c.Videos).FirstOrDefaultAsync();

                if (existingTrack == null) return null;

                if (trackToEditDto.Label != null) existingTrack.Label = trackToEditDto.Label;
                if (trackToEditDto.Progress != null) existingTrack.Progress = (int)trackToEditDto.Progress;
                if (trackToEditDto.ImgUrl != null) existingTrack.ImgUrl = trackToEditDto.ImgUrl;
                if (trackToEditDto.CurrentVideoIndex != null) existingTrack.CurrentVideoIndex = (int)trackToEditDto.CurrentVideoIndex;
                if (trackToEditDto.Videos.Count > 0) existingTrack.Videos = trackToEditDto.Videos.Select(v => v.FromVideoDto(existingTrack)).ToList();
                await _context.SaveChangesAsync();
                return trackToEditDto;
            }
            catch
            {
                return null;
            }
        }
        public async Task<VideoToEditDto> UpdateVideoAsync(VideoToEditDto videoToEditDto, string userId)
        {
            try
            {
                var existingTrack = await _context.Tracks.Where(t => t.UserId == userId && t.Id == videoToEditDto.TrackId).Include(c => c.Videos).FirstOrDefaultAsync();
                var existingVideo = existingTrack.Videos.Find(v => v.VideoUrl == videoToEditDto.VideoUrl);

                if (existingVideo == null) return null;

                if (videoToEditDto.IsDone != null) existingVideo.IsDone = (bool)videoToEditDto.IsDone;
                if (videoToEditDto.CurrentTime != null) existingVideo.CurrentTime = (int)videoToEditDto.CurrentTime;

                await _context.SaveChangesAsync();
                return videoToEditDto;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Track> DeleteAsync(int trackId, string userId)
        {
            try
            {
                var track = await _context.Tracks.FirstOrDefaultAsync(t => t.Id == trackId && t.UserId == userId);

                if (track == null) return null;

                _context.Tracks.Remove(track);
                await _context.SaveChangesAsync();
                return track;
            }
            catch
            {
                return null;
            }

        }
    }
}