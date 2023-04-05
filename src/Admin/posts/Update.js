import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";

function UpdatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getPostId();
  });

  //mendapatkan value post
  const getPostId = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/post/show/${id}`)
      .then((response) => {
        const data = response.data.data;

        setTitle(data.title);
        setContent(data.content);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  //mengupdate value post
  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `http://localhost:8000/api/v1/post/update/${id}`,
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
        console.log(response.data);
        navigate("/dashboard/posts/list");
        alert("Sukses Mengupdate post");
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
                Update Post
              </h3>
              <form onSubmit={updateHandler}>
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
                  Update Post
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePost;
