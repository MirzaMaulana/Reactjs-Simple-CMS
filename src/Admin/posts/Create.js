import React from "react";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const createHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/v1/post/create",
        {
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard/posts/CreatePost");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <Container>
      <Row>
        <Col
          md={2}
          className="shadow mt-4 rounded-3 px-3 fixed"
          style={{ height: 500 }}
        >
          <Sidebar />
        </Col>
        <Col md={10} className="mt-4">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <h3
                className="text-center my-0"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Create Post
              </h3>
              <form onSubmit={createHandler}>
                <div className="mb-3">
                  <label className="form-label">Title Post</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <Button type="submit" variant="success">
                  Create Post
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
