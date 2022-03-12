import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteLogo } from "../assets/trash.svg";

function Settings() {
  const nav = useNavigate();
  const [passwordChangeData, setChangeData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [alert, setAlert] = useState({ message: "", error: false });

  const AlertMessage = () => {
    if (alert.message === "") return;
    if (alert.error) return <Alert variant="danger">{alert.message}</Alert>;
    return <Alert variant="success">{alert.message}</Alert>;
  };

  const handleAccoutDelete = (e) => {
    e.preventDefault();
    fetch("https://timesync.one/removeAccount", {
      method: "DELETE",
      credentials: "include",
    }).then((data) => {
      if (data.status === 200) nav("/login");
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (
      passwordChangeData.newPassword !== passwordChangeData.confirmNewPassword
    ) {
      setAlert({ message: "Inccorect confirmation password", error: true });
    } else {
      fetch("https://timesync.one/changePassword", {
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
          setAlert({ message: "Success", error: false });
        } else {
          setChangeData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          setAlert({ message: "Incorrect Password", error: true });
        }
      });
    }
  };

  return (
    <Form onSubmit={handlePasswordChange}>
      <Form.Label>Change Password:</Form.Label>
      {AlertMessage()}
      <br />
      <Form.Text>Current Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.currentPassword}
        onChange={(e) => {
          setChangeData({
            ...passwordChangeData,
            currentPassword: e.target.value,
          });
          setAlert({ message: "", error: false });
        }}
      />
      <br />
      <Form.Text>New Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.newPassword}
        onChange={(e) => {
          setChangeData({
            ...passwordChangeData,
            newPassword: e.target.value,
          });
          setAlert({ message: "", error: false });
        }}
      />
      <br />
      <Form.Text>Confirm new Password</Form.Text>
      <Form.Control
        type="password"
        value={passwordChangeData.confirmNewPassword}
        onChange={(e) => {
          setChangeData({
            ...passwordChangeData,
            confirmNewPassword: e.target.value,
          });
          setAlert({ message: "", error: false });
        }}
      />
      <br />
      <Button type="submit">Change Password</Button>
      <hr />
      <Button onClick={handleAccoutDelete} className="btn-danger">
        Delete Account{" "}
        <span>
          <DeleteLogo style={{ width: "25px", fill: "white" }} />
        </span>
      </Button>
    </Form>
  );
}

export default Settings;
