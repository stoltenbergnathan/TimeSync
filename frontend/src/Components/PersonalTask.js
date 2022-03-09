import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import YouTubeVideo from "./YouTubeVideo";

function PersonalTask(props) {
  const [profileVid, setProfileVid] = useState(false);
  const [vids, setVids] = useState([]);

  const tutorialHandler = (e) => {
    if (!props.profile) props.generatorFunction(props.activity);
    else {
      if (!profileVid) {
        fetch(`http://localhost/api/youtube/${props.activity}`)
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
    fetch("http://localhost/saveSync", {
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
    setShow(false);
    fetch("http://localhost/PostActivity", {
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
    props.link !== "" ? (
      <>
        <h5>Link:</h5>{" "}
        <a href={props.link} rel="noreferrer" target="_blank">
          {props.link}
        </a>
        <br />
        <br />
      </>
    ) : (
      <></>
    );

  let button = !props.profile ? (
    <Button className="m-1" variant="success" onClick={saveActivity}>
      Save
    </Button>
  ) : (
    <Button
      className="m-1"
      variant="danger"
      onClick={() => props.profile(props.pkey)}
    >
      Delete
    </Button>
  );

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
      <Button variant="info" onClick={tutorialHandler}>
        {!props.profile ? "Generate" : !profileVid ? "Show" : "Hide"} Tutorials
      </Button>
      <br />
      <Button
        onClick={(event) => {
          setShow(true);
          event.target.disabled = true;
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
