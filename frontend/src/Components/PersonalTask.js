import React from "react";
import { Button } from "react-bootstrap";

function PersonalTask(props) {
  const tutorialHandler = (e) => {
    props.generatorFunction(props.activity);
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
    <Button onClick={saveActivity}>Save</Button>
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
      <h5>Activity:</h5>
      <p>{props.activity}</p>
      <h5>Type:</h5>
      <p>{props.type}</p>
      {link}
      <Button onClick={tutorialHandler}>Generate Tutorials</Button>
      {button}
    </div>
  );
}

export default PersonalTask;
