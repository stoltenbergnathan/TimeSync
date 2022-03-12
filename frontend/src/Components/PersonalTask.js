import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import YouTubeVideo from "./YouTubeVideo";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SaveLogo } from "../assets/archive.svg";
import { ReactComponent as DeleteLogo } from "../assets/trash.svg";

function PersonalTask(props) {
  const [profileVid, setProfileVid] = useState(false);
  const [vids, setVids] = useState([]);
  let nav = useNavigate();
  const tutorialHandler = (e) => {
    if (!props.profile) props.generatorFunction(props.activity);
    else {
      if (!profileVid) {
        fetch(`https://www.timesync.one/api/youtube/${props.activity}`)
          .then((response) => response.json())
          .then((data) => setVids(data.items));
        setProfileVid(true);
      } else setProfileVid(false);
    }
  };

  const generateSlideVideos = () => {
    if (!profileVid) return <></>;
    return (
      <Carousel variant="dark" interval={null} indicators={false}>
        {vids.map((vid) => {
          return (
            <Carousel.Item>
              <YouTubeVideo video={vid} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  };

  const saveActivity = (e) => {
    fetch("https://www.timesync.one/saveSync", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        stype: "activity",
        obj: { activity: props.activity, type: props.type, link: props.link },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const postActivity = (event, title, genre, url, visable) => {
    nav("/");
    setShow(false);
    fetch("https://www.timesync.one/PostActivity", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        genre: genre,
        url: url,
        visability: visable,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

  let link =
    props.link === "" || props.link === undefined ? (
      <></>
    ) : (
      <>
        {" "}
        <h5>Link:</h5>{" "}
        <a href={props.link} rel="noreferrer" target="_blank">
          Learn about activity
        </a>
        <br />
        <br />
      </>
    );

  let button = !props.profile ? (
    <Button className="m-1" variant="outline-success" onClick={saveActivity}>
      <SaveLogo style={{ width: "16px", fill: "white" }} />
    </Button>
  ) : (
    <Button
      className="m-1"
      variant="danger"
      onClick={() => props.profile(props.pkey)}
    >
      <DeleteLogo style={{ width: "20px", fill: "white" }} />
    </Button>
  );

  if (props.msg !== undefined) {
    let button = props.msg ? (
      <Button className="m-1" variant="outline-success" onClick={saveActivity}>
        <SaveLogo style={{ width: "20px", fill: "white" }} />
      </Button>
    ) : (
      <></>
    );
    return (
      <div
        className="shadow-lg m-2"
        style={{ padding: "10px", textAlign: "center" }}
      >
        <h5>Activity:</h5>
        <p>{props.activity}</p>
        <h5>Type:</h5>
        <p>{props.type}</p>
        {link}
        {button}
        {generateSlideVideos()}
      </div>
    );
  } else
    return (
      <div
        className="shadow m-2"
        style={{ padding: "10px", textAlign: "center" }}
      >
        <h5>Activity:</h5>
        <p>{props.activity}</p>
        <h5>Type:</h5>
        <p>{props.type}</p>
        {link}
        <Button variant="primary" onClick={tutorialHandler}>
          {!props.profile ? "Generate" : !profileVid ? "Show" : "Hide"}{" "}
          Tutorials
        </Button>{" "}
        <Button
          onClick={(event) => {
            setShow(true);
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
              variant="primary"
              id="Public"
              onClick={(event) => {
                postActivity(
                  event,
                  props.activity,
                  props.type,
                  props.link,
                  "Public"
                );
              }}
            >
              Public
            </Button>
            <Button
              variant="primary"
              id="Private"
              onClick={(event) => {
                postActivity(
                  event,
                  props.activity,
                  props.type,
                  props.link,
                  "Private"
                );
              }}
            >
              Friends
            </Button>
          </Modal.Footer>
        </Modal>
        {button}
        {generateSlideVideos()}
      </div>
    );
}

export default PersonalTask;
