import React from "react";
import PersonalForm from "./PersonalForm";
import PersonalTaskList from "./PersonalTaskList";

function Personal() {
  return (
    <React.Fragment>
      <PersonalForm />
      <br style={{ margin: 50 }} />
      <PersonalTaskList />
    </React.Fragment>
  );
}

export default Personal;
