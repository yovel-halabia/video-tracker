using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Video;

namespace backend.Utils
{
    public static class Validations
    {
        public static bool IsValidVideoList(this List<VideoDto> videoList)
        {
            for (int i = 0; i < videoList.Count; i++)
            {
                if (videoList.FindAll(v => v.VideoUrl == videoList[i].VideoUrl).ToList().Count > 1) return false;
            }
            return true;
        }
    }
}