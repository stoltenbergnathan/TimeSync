import { React, useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Row,
  Col,
  Accordion,
  Button,
  ListGroup,
} from "react-bootstrap";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as CommentLogo } from "../assets/comment.svg";
import dateFormat from "dateformat";

function PostComments({ _id, comments, kind }) {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));

    setCommentList(comments);
  }, [comments]);

  const postComment = (e) => {
    e.preventDefault();
    let date = dateFormat(Date(), "mm/dd/yy h:MM TT");
    let data = {
      user: user,
      date: date,
      comment: comment,
    };
    setCommentList((prev) => [...prev, data]);
    setComment("");
    let findPost = {
      _id: _id,
      kind: kind,
      comment: data,
    };
    fetch("http://localhost/PostComment", {
      method: "POST",
      body: JSON.stringify(findPost),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Row>
        <Col xs={1}>
          <Heart
            className="m-1"
            style={{ fill: "red", height: "20px", width: "20px" }}
          />
        </Col>
        <Col xs={11}>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {commentList.length} Comments
                <span>
                  <CommentLogo
                    className="m-1"
                    style={{ fill: "black", height: "16px" }}
                  />
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <ListGroup>
                    {console.log(commentList)}
                    {commentList.map((data) => (
                      <>
                        <div>
                          @{data.user}
                          <span
                            className="m-3"
                            style={{ fontSize: "11px", color: "grey" }}
                          >
                            {data.date}
                          </span>
                        </div>
                        <p>{data.comment}</p>
                        <hr className="mt-0" />
                      </>
                    ))}
                  </ListGroup>
                  <Form id="messageInput" onSubmit={postComment}>
                    <InputGroup className="m-1">
                      <Form.Control
                        id="msg"
                        type="text"
                        size="md"
                        placeholder="Type Message... "
                        required={true}
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                      <Button
                        id="msgButt"
                        variant="primary"
                        size="md"
                        type="submit"
                      >
                        Post
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </>
  );
}

export default PostComments;
