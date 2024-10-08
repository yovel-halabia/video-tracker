using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Video
    {
        public int Id { get; set; }
        [Required]
        public string VideoUrl { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        public bool IsDone { get; set; } = false;
        public int CurrentTime { get; set; } = 0;
        public int TrackId { get; set; }
        public Track Track { get; set; }
    }
}