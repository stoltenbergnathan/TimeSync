import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Settings() {
  const [passwordChangeData, setChangeData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // TODO
  /*
  - Delete Account
  - Change Profile Picture
  */

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log(passwordChangeData);
    // Invalidate session and make user login again
    // Send an email?
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
    </Form>
  );
}

export default Settings;
