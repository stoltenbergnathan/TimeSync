import React from "react";
import { Button } from "react-bootstrap";

function EventShow(props) {
  const saveEvent = (e) => {
    fetch("http://localhost/saveSync", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        stype: "event",
        obj: {
          title: props.title,
          genre: props.genre,
          date: props.dateTime.localDate,
          time: props.dateTime.localTime,
          link: props.eventUrl,
          img: props.imageUrl,
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  let button = !props.profile ? (
    <Button onClick={saveEvent}>Save</Button>
  ) : (
    <Button variant="danger" onClick={() => props.profile(props.pkey)}>
      Delete
    </Button>
  );

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
      {button}
      <br />
    </div>
  );
}

export default EventShow;
