import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";

function PostShow() {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // POST SINGLE SHOW

  useEffect(() => {
    const getPostId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/post/show/${id}`
        );
        const { data } = response.data;
        setTags(data.tags);
        setCategories(data.categories);
        setPost(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getPostId();
  }, [id]);

  function Back() {
    navigate(-1);
  }
  // POST SINGLE SHOW

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={10}>
          <div>
            <p>{post.views}</p>
            <h1 className="text-center">{post.title}</h1>
            <p className="text-center">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  as={Link}
                  to={`/posts/category/${category.name}`}
                  className="d-inline-block me-2 text-decoration-none p-1 rounded-3 text-dark"
                  style={{ border: "1px solid black" }}
                >
                  {category.name}
                </Link>
              ))}
            </p>
            <img src={post.image} alt={post.image} className="w-100 my-4" />
            <p>{post.content}</p>
            <p>
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  as={Link}
                  to={`/posts/tag/${tag.name}`}
                  className="text-decoration-none me-2"
                >
                  #{tag.name}
                </Link>
              ))}
            </p>
            <Button className="btn btn-success" onClick={Back}>
              Back To Post
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        {!!token ? (
          <Col md="10" className="my-4">
            <Comment id={id} />
          </Col>
        ) : (
          <Col md="10" className="my-4">
            <h5 className="alert alert-warning">
              Anda Harus Login Terlebih Dahulu Jika Mau Berkomentar
            </h5>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default PostShow;
