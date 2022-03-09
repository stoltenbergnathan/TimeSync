import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EventShow(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const nav = useNavigate;
  const postEvent = (e, title, genre, dateTime, image, url, visability) => {
    setShow(false);
    nav("/");
    fetch("http://localhost/PostEvent", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        genre: genre,
        dateTime: dateTime,
        image: image,
        url: url,
        visability: visability,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

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
      .then((data) => {
        if (data.status !== 200) console.log(data);
      });
  };

  const saveEventMsg = () => {
    fetch("http://localhost/saveSync", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        stype: "event",
        obj: {
          title: props.title,
          genre: props.genre,
          date: props.date,
          time: props.time,
          link: props.eventUrl,
          img: props.imageUrl,
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) console.log(data);
      });
  };

  let button = !props.profile ? (
    <Button onClick={saveEvent}>Save</Button>
  ) : (
    <Button variant="danger" onClick={() => props.profile(props.pkey)}>
      Delete
    </Button>
  );

  if (props.msg !== undefined) {
    let button = props.msg ? (
      <Button onClick={saveEventMsg}>Save</Button>
    ) : (
      <></>
    );
    return (
      <div
        className="shadow-lg m-2 rounded border-secondary"
        style={{ padding: "10px", textAlign: "center" }}
      >
        <h5>Event:</h5>
        <p>{props.title}</p>
        <h5>Genre:</h5>
        <p>{props.genre}</p>
        <h5>Date/Time:</h5>
        {`${props.date} ${props.time}`}
        <h5>Link:</h5>
        <a
          href={props.eventUrl}
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: 14 }}
        >
          {props.eventUrl}
        </a>
        <br />
        {button}
        <br />
      </div>
    );
  } else {
    return (
      <div
        className="shadow m-2 rounded border-secondary"
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
          onClick={(e) => {
            setShow(true);
            e.target.disabled = true;
          }}
        >
          Post
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p>Do you want your post to be in the public or friends feed?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              id="Public"
              onClick={(e) => {
                postEvent(
                  e,
                  props.title,
                  props.genre,
                  props.dateTime,
                  props.imageUrl,
                  props.eventUrl,
                  "Public"
                );
              }}
            >
              Public
            </Button>
            <Button
              variant="primary"
              id="Private"
              onClick={(e) => {
                postEvent(
                  e,
                  props.title,
                  props.genre,
                  props.dateTime,
                  props.imageUrl,
                  props.eventUrl,
                  "Public"
                );
              }}
            >
              Friends
            </Button>
          </Modal.Footer>
        </Modal>
        {button}
        <br />
      </div>
    );
  }
}

export default EventShow;
