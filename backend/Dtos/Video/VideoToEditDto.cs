using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Video
{
    public class VideoToEditDto
    {
        [Required]
        public int TrackId { get; set; }
        [Required]
        public string VideoUrl { get; set; }
        public bool? IsDone { get; set; }
        public int? CurrentTime { get; set; }
    }
}