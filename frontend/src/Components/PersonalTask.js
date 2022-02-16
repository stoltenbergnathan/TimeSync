import React from "react";

function PersonalTask(props) {
  return (
    <div>
      <h5>Activity:</h5>
      <p>{props.activity}</p>
      <h5>Type:</h5>
      <p>{props.type}</p>
    </div>
  );
}

export default PersonalTask;
