using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public bool IsSearch { get; set; } = false;
        public List<Track> Tracks { get; set; } = new List<Track>();
    }
}