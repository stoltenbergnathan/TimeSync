import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function EventShow(props) {
  const postEvent = (e, title, genre, dateTime, image, url) => {
    fetch("http://localhost/PostEvent", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        genre: genre,
        dateTime: dateTime,
        image: image,
        url: url,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) console.log(data);
      });
  };

  return (
    <div
      className="border rounded border-secondary"
      style={{ padding: "10px", textAlign: "center" }}
    >
      <img
        src={props.imageUrl}
        alt="event preview"
        style={{ height: "20%", width: "30%" }}
      ></img>
      <p></p>
      <h5>Event:</h5>
      <p>{props.title}</p>
      <h5>Genre:</h5>
      <p>{props.genre}</p>
      <h5>Date/Time:</h5>
      <p>
        {props.dateTime.localDate} {props.dateTime.localTime}
      </p>
      <h5>Link:</h5>
      <a
        href={props.eventUrl}
        rel="noreferrer"
        target="_blank"
        style={{ fontSize: 14 }}
      >
        {props.eventUrl}
      </a>
      <Button
        className="m-1"
        onClick={(e) =>
          postEvent(
            e,
            props.title,
            props.genre,
            props.dateTime,
            props.imageUrl,
            props.eventUrl
          )
        }
      >
        Post
      </Button>
      <br />
    </div>
  );
}

export default EventShow;
