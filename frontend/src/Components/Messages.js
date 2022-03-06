import React from "react";
import { Button } from "react-bootstrap";

function Messages() {
  return (
    <div>
      <div className="row container-fluid">
        <div className="col-sm-4">
          <form
            id="friends"
            className="form-check"
            style={{ overflow: "auto", maxHeight: "490px" }}
          ></form>
          <form
            id="friendform"
            style={{ position: "static", marginTop: "auto" }}
          ></form>
        </div>

        <div className="col-sm-8 border-box">
          <ul id="messages" style={{ overflow: "auto" }}></ul>
          <form className="inline-block" id="form" action="">
            <input id="input" autoComplete="off" />
            <Button variant="primary m-1" size="sm">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
