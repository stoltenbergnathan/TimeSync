import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function FriendRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("https://timesync.one/FriendRequests", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setRequests(data));
  }, []);

  const acceptRequest = (e, accept) => {
    const newList = requests.filter((request) => request !== accept);
    setRequests(newList);
    fetch("https://timesync.one/AcceptFriendRequests", {
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
    fetch("https://timesync.one/FriendRequests", {
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
            <Button className="m-1" onClick={(e) => acceptRequest(e, request)}>
              Accept
            </Button>
            <Button
              onClick={(e) => rejectRequest(e, request)}
              className="btn-danger"
            >
              Reject
            </Button>
            <br />
          </>
        );
      })}
    </>
  );
}

export default FriendRequests;
