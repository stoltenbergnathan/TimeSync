import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function FriendRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost/FriendRequests", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setRequests(data));
  }, []);

  const acceptRequest = (e, accept) => {
    const newList = requests.filter((request) => request !== accept);
    setRequests(newList);
    fetch("http://localhost/AcceptFriendRequests", {
      method: "POST",
      body: JSON.stringify({
        friend: accept,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) console.log(data);
      });
  };

  const rejectRequest = (e, reject) => {
    const newList = requests.filter((request) => request !== reject);
    setRequests(newList);
    fetch("http://localhost/FriendRequests", {
      method: "DELETE",
      body: JSON.stringify({
        reject: reject,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRequests(data));
  };

  return (
    <>
      <p>Friend Requests:</p>
      {requests.map((request) => {
        return (
          <>
            <p>{request}</p>
            <Button onClick={(e) => acceptRequest(e, request)}>Accept</Button>
            <Button
              onClick={(e) => rejectRequest(e, request)}
              className="btn-danger"
            >
              Reject
            </Button>
          </>
        );
      })}
    </>
  );
}

export default FriendRequests;
