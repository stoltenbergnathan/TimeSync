import React from "react";

function EventShow(props) {
  let link =
    props.eventUrl !== "" ? (
      <>
        <h5>Link:</h5>{" "}
        <a href={props.eventUrl} rel="noreferrer" target="_blank">
          {props.eventUrl}
        </a>
        <br />
        <br />
      </>
    ) : (
      <></>
    );

  return (
    <div
      className="border rounded border-secondary"
      style={{ padding: "10px", textAlign: "center" }}
    >
      <img src={props.imgBaseUrl} alt="event preview"></img>
      <h5>Event:</h5>
      <p>{props.title}</p>
      <h5>Description:</h5>
      <p>{props.description}</p>
      <h5>Date/Time:</h5>
      <p>{props.dateTime}</p>
      <h5>Duration:</h5>
      <p>{props.duration}</p>
      {link}
    </div>
  );
}

export default EventShow;
