import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [is_pinned, setIsPinned] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    tagsData();
  }, []);

  const tagsData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/tag/all")
      .then((response) => {
        const data = response.data.data;
        setTags(data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  function handleImage(event) {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  const handleTagChange = (event) => {
    const tagId = parseInt(event.target.value);
    if (event.target.checked) {
      setTag([...tag, tagId]);
    } else {
      setTag(tag.filter((id) => id !== tagId));
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("is_pinned", is_pinned);
      tag.forEach((id) => formData.append("tag[]", id));
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/v1/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/dashboard/posts/list");
    } catch (error) {
      toast.danger(error.response.data);
    }
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
              <Form onSubmit={createHandler}>
                <div className="mb-3">
                  <label className="form-label">Title Post</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <Form.Check
                    className="me-3"
                    type="radio"
                    id="is_pinned1"
                    name="is_pinned"
                    label={<span className="bi bi-pin"> Pinned</span>}
                    value={1}
                    checked={is_pinned}
                    onChange={(event) =>
                      setIsPinned(parseInt(event.target.value))
                    }
                  />

                  <Form.Check
                    type="radio"
                    id="is_pinned2"
                    name="is_pinned"
                    label="No Pin"
                    value={0}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label d-block">Image Post</label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="selected file"
                      className="mb-3 rounded-2"
                      height={100}
                    />
                  )}

                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImage}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control mb-3"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows="3"
                  ></textarea>
                  {tags.map((tag) => (
                    <div key={tag.id} className="form-check form-check-inline">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id={`tag${tag.id}`}
                        value={tag.id}
                        onChange={handleTagChange}
                      />
                      <label
                        className="form-check-label text-primary"
                        htmlFor={`tag${tag.id}`}
                      >
                        #{tag.name}
                      </label>
                    </div>
                  ))}
                </div>
                <Button type="submit" variant="success">
                  Create Post
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
