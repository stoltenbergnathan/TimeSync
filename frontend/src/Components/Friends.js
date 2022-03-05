import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Friend from "./Friend";

function Friends() {
  const [friendSearch, setFriendSearch] = useState("");
  const [friendList, setFriendList] = useState(["Test1", "Test2"]);

  const handleFriendSearch = (e) => {
    e.preventDefault();
    setFriendList([...friendList, friendSearch]);
  };

  return (
    <>
      <Form onSubmit={handleFriendSearch}>
        <Form.Label>Search for Friends</Form.Label>
        <Form.Control
          type="input"
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
        />
      </Form>
      <br />
      <>
        <p>List of Friends:</p>
        <Container fluid>
          {friendList.map((friend) => (
            <Friend name={friend} />
          ))}
        </Container>
      </>
    </>
  );
}

export default Friends;
