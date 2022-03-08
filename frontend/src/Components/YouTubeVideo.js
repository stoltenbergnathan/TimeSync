import React from "react";
import { Container } from "react-bootstrap";

function YouTubeVideo({ video }) {
  return (
    <Container className="m-1">
      <h6>{video.snippet.title}</h6>
      <a
        href={`https://youtube.com/watch?v=${video.id.videoId}`}
        rel="noreferrer"
        target="_blank"
      >
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={`Youtube thumbnail for ${video.snippet.title}`}
        />
      </a>
      <br />
      <br />
    </Container>
  );
}

export default YouTubeVideo;
