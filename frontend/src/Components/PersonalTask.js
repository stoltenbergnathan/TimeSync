import React from "react";
import { Button } from "react-bootstrap";

function PersonalTask(props) {
  const tutorialHandler = (e) => {
    props.generatorFunction(props.activity);
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
    </div>
  );
}

export default PersonalTask;
