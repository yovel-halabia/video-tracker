using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Track;
using backend.Dtos.Video;
using backend.Models;

namespace backend.Interfaces
{
    public interface ITrackRepository
    {
        Task<Track> CreateAsync(Track track);
        Task<TrackToEditDto> UpdateAsync(TrackToEditDto trackToEditDto, string userId);
        Task<VideoToEditDto> UpdateVideoAsync(VideoToEditDto videoToEditDto, string userId);
        Task<Track> DeleteAsync(int trackId, string userId);
    }
}