using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Dtos.User
{
    public class UserDto
    {
        [Required]
        public string UserName { get; set; } = String.Empty;
        [Required]
        public string Email { get; set; } = String.Empty;
        [Required]
        public List<Track> Tracks { get; set; }
        [Required]
        public string Token { get; set; } = string.Empty;

    }
}