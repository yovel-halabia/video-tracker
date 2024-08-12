using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Video;

namespace backend.Dtos.Track
{
    public class TrackToEditDto
    {
        [Required]
        public int Id { get; set; }
        public string? Label { get; set; }
        public int? Progress { get; set; }
        public string? ImgUrl { get; set; }
        public int? CurrentVideoIndex { get; set; }
        public List<VideoDto> Videos { get; set; } = new List<VideoDto>();
    }
}