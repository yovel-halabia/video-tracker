using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string ImgUrl { get; set; } = String.Empty;
        public bool IsDone { get; set; } = false;
        public int CurrentTime { get; set; } = 0;
        public int? TrackId { get; set; }
        public Track? Track { get; set; }
    }
}