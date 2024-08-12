using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Track
    {
        public int Id { get; set; }
        [Required]
        public string Label { get; set; }
        public int Progress { get; set; } = 0;
        [Required]
        public string ImgUrl { get; set; }
        public int CurrentVideoIndex { get; set; } = 0;
        public List<Video> Videos { get; set; } = new List<Video>();
        public string UserId { get; set; }
        public User User { get; set; }
    }
}