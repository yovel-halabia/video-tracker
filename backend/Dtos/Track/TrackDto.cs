using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Video;

namespace backend.Dtos.Track
{
    public class TrackDto
    {
        public int Id { get; set; }
        [Required]
        public string Label { get; set; }
        [Required]
        public int Progress { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        [Required]
        public int CurrentVideoIndex { get; set; }
        [Required]
        public List<VideoDto> Videos { get; set; }
    }
}