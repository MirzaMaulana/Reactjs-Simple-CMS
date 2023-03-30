//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col } from "react-bootstrap";

//import axios
import axios from "axios";

function PostIndex() {
  //define state
  const [posts, setPosts] = useState([]);

  //useEffect hook
  useEffect(() => {
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get("http://localhost:8000/api/v1/post/list");
    const data = await response.data.data;
    setPosts(data);
  };

  return (
    <Container className="mt-3">
      <Row>
        {posts.map((post) => (
          <Col md="4" key={post.id} className="mb-3">
            <Card className="border-0">
              <img
                src="https://source.unsplash.com/random"
                height="200"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <small className="text-muted d-flex justify-content-between">
                  <p>
                    <small className="text-decoration-none text-dark">
                      {post.created_by}
                    </small>
                  </p>
                  <p>{post.views} Views</p>
                </small>
                <h5 className="card-title d-flex justify-content-between">
                  <a
                    href={`/post/${post.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {post.title}
                  </a>
                  <a href={`/post/${post.id}`} className="text-dark">
                    <i className="bi bi-arrow-up-right-circle absolute"></i>
                  </a>
                </h5>
                <p className="card-text">
                  {post.content.replace(/<[^>]+>/g, "").substring(0, 50)}...
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostIndex;
