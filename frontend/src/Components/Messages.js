import React from "react";
import { Button } from "react-bootstrap";

function Messages() {
  return (
    <div>
      <div class="row container-fluid">
        <div class="col-sm-4">
          <form
            id="groups"
            class="form-check"
            style={{ overflow: "auto", "max-height": "490px" }}
          ></form>
          <form
            id="groupform"
            style={{ position: "static", "margin-top": "auto" }}
          >
            <input id="newgroup" type="text" autocomplete="off"></input>
            <div style={{ "padding-top": "15px" }}>
              <Button variant="primary" size="md" type="submit">
                Create New Group
              </Button>
            </div>
          </form>
        </div>

        <div class="col-sm-8 border-box">
          <ul id="messages" style={{ overflow: "auto" }}></ul>
          <form class="inline-block" id="form" action="">
            <input id="input" autocomplete="off" />
            <Button variant="primary  m-1 " size="sm">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
