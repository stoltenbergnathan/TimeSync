import React from "react";

function PersonalTask(props) {
  return (
    <div>
      <h5>Activity:</h5>
      <p>{props.activity}</p>
      <h5>Type:</h5>
      <p>{props.type}</p>
      <h5>Tutorial</h5>
      <a
        href={`https://www.youtube.com/results?search_query=${props.activity} tutorial`}
      >
        Tutorial
      </a>
    </div>
  );
}

export default PersonalTask;
