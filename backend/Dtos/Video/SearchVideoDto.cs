using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Video
{
    public class SearchVideoDto
    {
        [Required]
        public string VideoUrl { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        public bool IsDone { get; set; } = false;
        public int CurrentTime { get; set; } = 0;
    }
}