using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Track;
using backend.Models;

namespace backend.Mappers
{
    public static class TrackMappers
    {
        public static TrackDto ToTrackDto(this Track trackModel)
        {
            return new TrackDto
            {
                Id = trackModel.Id,
                Label = trackModel.Label,
                Progress = trackModel.Progress,
                ImgUrl = trackModel.ImgUrl,
                CurrentVideoIndex = trackModel.CurrentVideoIndex,
                Videos = trackModel.Videos.Select(v => v.ToVideoDto()).ToList(),
            };
        }

    }
}