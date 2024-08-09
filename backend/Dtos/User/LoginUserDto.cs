using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Track;
using backend.Models;

namespace backend.Dtos.User
{
    public class LoginUserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public List<TrackDto> Tracks { get; set; }
        [Required]
        public string Token { get; set; } = string.Empty;

    }
}