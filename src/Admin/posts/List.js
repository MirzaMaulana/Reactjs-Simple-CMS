import React from "react";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";

function List() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fectData();
  }, []);

  const fectData = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/post/list");
    const data = await response.data.data;
    setPosts(data);
  };

  const deleteHandler = async (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/post/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        fectData();
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
              <Button
                as={Link}
                to={"/dashboard/posts/create"}
                variant="success"
                className="mb-3"
              >
                Add Post
              </Button>
              <Table striped bordered hover className="mb-1">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>TITLE</th>
                    <th>CREATED BY</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1}</td>
                      <td>{post.title}</td>
                      <td>{post.created_by}</td>
                      <td className="text-center d-flex">
                        <Button
                          as={Link}
                          className="btn me-2 btn-danger btn-sm"
                          onClick={() => deleteHandler(post.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <Link
                          as={Link}
                          className="btn btn-primary btn-sm"
                          to={`/dashboard/posts/update/${post.id}`}
                        >
                          <i className="bi bi-pen"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default List;
