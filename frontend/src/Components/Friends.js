import { useState } from "react";
import { Form } from "react-bootstrap";
import Friend from "./Friend";

function Friends() {
  const [friendSearch, setFriendSearch] = useState("");
  const [friendList, setFriendList] = useState([
    { name: "Test1" },
    { name: "Test2" },
    { name: "Test3" },
    { name: "Test4" },
  ]);

  const handleFriendSearch = (e) => {
    e.preventDefault();
    console.log(friendSearch);
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
        {friendList.map((friend) => (
          <Friend name={friend.name} />
        ))}
      </>
    </>
  );
}

export default Friends;
