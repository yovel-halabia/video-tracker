using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Label { get; set; } = String.Empty;
        public int Progress { get; set; }
        public string ImgUrl { get; set; } = String.Empty;
        public int CurrentVideoIndex { get; set; } = 0;
        public List<Video> Videos { get; set; } = new List<Video>();

        public int? UserId { get; set; }
        public User? User { get; set; }
    }
}