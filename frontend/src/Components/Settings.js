import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Settings({ username }) {
  const [passwordChangeData, setChangeData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (
      passwordChangeData.newPassword !== passwordChangeData.confirmNewPassword
    ) {
      // TODO Let User know that passwords must be the same
    } else {
      fetch("http://localhost/changePassword", {
        method: "POST",
        body: JSON.stringify({
          password: passwordChangeData.currentPassword,
          newPassword: passwordChangeData.newPassword,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then((data) => {
        if (data.status === 200) {
          setChangeData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          // TODO Print success message
        } else {
          setChangeData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          // TODO make sure to let user know password was incorrect
        }
      });
    }
  };

  return (
    <Form onSubmit={handlePasswordChange}>
      <Form.Label>Change Password:</Form.Label>
      <br />
      <Form.Text>Current Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.currentPassword}
        onChange={(e) =>
          setChangeData({
            ...passwordChangeData,
            currentPassword: e.target.value,
          })
        }
      />
      <br />
      <Form.Text>New Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.newPassword}
        onChange={(e) =>
          setChangeData({
            ...passwordChangeData,
            newPassword: e.target.value,
          })
        }
      />
      <br />
      <Form.Text>Confirm new Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.confirmNewPassword}
        onChange={(e) =>
          setChangeData({
            ...passwordChangeData,
            confirmNewPassword: e.target.value,
          })
        }
      />
      <br />
      <Button type="submit">Change Password</Button>
      <hr />
      <Button className="btn-danger">Delete Account</Button>
    </Form>
  );
}

export default Settings;
