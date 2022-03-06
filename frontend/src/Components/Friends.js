import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Friend from "./Friend";

function Friends({ username }) {
  const [friendSearch, setFriendSearch] = useState("");
  const [requestSubmitted, setRequestStatus] = useState(false);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Friends", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, []);

  const handleFriendRequest = (e) => {
    e.preventDefault();
    if (friendSearch === username) return; // TODO message saying no
    fetch("http://localhost/FriendRequest", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user: friendSearch,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setRequestStatus(true);
  };

  const handleFriendDeletion = (e, name) => {
    const newFriends = friendList.filter((friend) => friend !== name);
    setFriendList(newFriends);
    fetch("http://localhost/Friends", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        user: name,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      if (data.response !== 200) console.log(data);
    });
  };

  const searchResults = () => {
    if (!requestSubmitted) return <></>;
    let searched = friendSearch;
    return <p>Friend request sent to '{searched}'</p>;
  };

  return (
    <>
      <Form onSubmit={handleFriendRequest}>
        <Form.Label>Send Friend Request</Form.Label>
        <Form.Control
          type="input"
          value={friendSearch}
          onChange={(e) => {
            setFriendSearch(e.target.value);
            setRequestStatus(false);
          }}
        />
      </Form>
      <br />
      {searchResults()}
      <br />
      <p>List of Friends:</p>
      <Container fluid>
        {friendList.map((friend) => (
          <Friend name={friend} handleFriendDeletion={handleFriendDeletion} />
        ))}
      </Container>
    </>
  );
}

export default Friends;
