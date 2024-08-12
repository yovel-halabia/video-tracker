using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Video;
using backend.Models;

namespace backend.Mappers
{
    public static class VideoMappers
    {
        public static VideoDto ToVideoDto(this Video videoModel)
        {
            return new VideoDto
            {
                VideoUrl = videoModel.VideoUrl,
                Title = videoModel.Title,
                ImgUrl = videoModel.ImgUrl,
                IsDone = videoModel.IsDone,
                CurrentTime = videoModel.CurrentTime,
            };
        }

        public static Video FromVideoDto(this VideoDto videoDto, Track track)
        {
            return new Video
            {
                VideoUrl = videoDto.VideoUrl,
                Title = videoDto.Title,
                ImgUrl = videoDto.ImgUrl,
                IsDone = videoDto.IsDone,
                CurrentTime = videoDto.CurrentTime,
                TrackId = track.Id,
                Track = track,
            };
        }
    }
}