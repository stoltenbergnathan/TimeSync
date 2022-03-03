import React from "react";

function EventShow(props) {
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
      <h5>Link:</h5>{" "}
      <a href={props.eventUrl} rel="noreferrer" target="_blank">
        {props.eventUrl}
      </a>
      <br />
    </div>
  );
}

export default EventShow;
