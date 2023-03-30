import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListGroup, Card, Container, Row, Col, Button } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";

function PostShow() {
  const [post, setPost] = useState({});
  var { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/post/show/${id}`
    );
    const data = response.data.data;
    setPost(data);
    setComment(data.comment);
  };

  function Back() {
    navigate(-1);
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={10}>
          <Card>
            <Card.Img src="https://source.unsplash.com/random" height={400} />
            <Card.Body>
              <h1 className="text-center">{post.title}</h1>
              <Card.Text>{post.content}</Card.Text>
              <Button className="btn btn-success" onClick={Back}>
                Back To Post
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="10" className="my-4">
          <Comment id={id} />
        </Col>
        <Col md="10">
          <h2>Comments ( {comment.length} )</h2>
          <ListGroup className="mt-3">
            {comment.map((comments) => (
              <ListGroup.Item key={comments.id}>
                <h5>{comments.name}</h5>
                <p>{comments.content}</p>
                <small>{comments.created_at_format}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default PostShow;
