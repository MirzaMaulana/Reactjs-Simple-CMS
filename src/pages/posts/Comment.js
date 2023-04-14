import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Comment = ({ id }) => {
  const [comment, setComment] = useState([]);
  //Reply comment
  const [show, setShow] = useState(false);
  const [comment_id, setCommentId] = useState(null);
  const [content1, setContent1] = useState("");
  const [content, setContent] = useState("");
  const post_id = id;
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCommentId(id);
    setShow(true);
  };

  useEffect(() => {
    const getPostId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/post/show/${id}`
        );
        const { data } = response.data;
        setComment(data.comment);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getPostId();
  }, [comment]);

  const replyHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:8000/api/v1/comment/reply`,
          {
            comment_id,
            post_id,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          handleClose();
          console.log(response.data);
          setContent("");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem("token");

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:8000/api/v1/post/${id}/comment`,
          {
            content: content1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setContent1("");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <form onSubmit={commentHandler}>
        <div className="form-group">
          <label htmlFor="content">Leave a comment</label>
          <textarea
            name="content"
            id="postContent"
            className="form-control"
            value={content1}
            required
            rows="3"
            maxLength="255"
            onChange={(event) => setContent1(event.target.value)}
          ></textarea>
        </div>
        <button className="mt-3 btn btn-outline-success">Submit</button>
      </form>
      <ListGroup className="mt-3">
        {comment.map((comments) => (
          <ListGroup.Item key={comments.id} className="mt-2">
            <h5>{comments.name}</h5>
            <p>{comments.content}</p>
            <small>{comments.created_at_format}</small>
            <Button
              variant="success"
              className="btn-sm"
              onClick={() => handleShow(comments.id)}
            >
              Balas
            </Button>
            {comments.replies.map((reply) => (
              <ListGroup.Item key={reply.id} className="mt-2 ms-3">
                <h5>{reply.name}</h5>
                <p>{reply.content}</p>
                <small>{reply.created_at_format}</small>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="hidden" value={post_id} autoFocus />
            <Form.Control type="hidden" value={comment_id} autoFocus />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={replyHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Comment;
