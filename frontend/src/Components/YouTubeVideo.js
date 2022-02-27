import React from "react";

function YouTubeVideo({ video }) {
  return (
    <>
      <a href={`https://youtube.com/watch?v=${video.id.videoId}`}>
        {video.snippet.title}
      </a>
      <br />
      <img src={video.snippet.thumbnails.high.url} />
      <br />
      <br />
    </>
  );
}

export default YouTubeVideo;
