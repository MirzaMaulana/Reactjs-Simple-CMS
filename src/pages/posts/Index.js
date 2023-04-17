//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

import { useParams } from "react-router-dom";
//import axios
import axios from "axios";

function PostIndex() {
  const [posts, setPosts] = useState([]);
  const { tag } = useParams("");
  const [pinPost, setPinPost] = useState([]);
  useEffect(() => {
    fectData();
  }, [tag]);

  const fectData = async () => {
    let api = "http://localhost:8000/api/v1/post/list";
    if (tag) {
      api += `?tag=${tag}`;
    }
    const response = await axios.get(api);
    const data = await response.data.data;
    const pinPost = await response.data.pinned;
    setPinPost(pinPost);
    setPosts(data);
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container className="mt-3">
      <Row>
        {tag ? (
          <h2 className="mt-2">#{tag}</h2>
        ) : (
          <h2 className="mt-2">Most Populer</h2>
        )}

        <Carousel
          activeIndex={index}
          className="mt-3 mb-4"
          onSelect={handleSelect}
        >
          {pinPost.map((pinned) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pinned.image}
                height={500}
                alt=""
              />
              <Carousel.Caption>
                <h3>{pinned.title}</h3>
                <p>
                  {pinned.content.replace(/<[^>]+>/g, "").substring(0, 50)}...
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {posts.map(
          (post) =>
            post.is_pinned === 0 && (
              <Col md="4" key={post.id} className="mb-3">
                <Card className="border-0">
                  <img
                    src={post.image}
                    height="200"
                    className="card-img-top rounded-2"
                    alt="post"
                  />
                  <div className="m-2">
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
                    <small className="text-secondary">{post.created_at}</small>
                  </div>
                </Card>
              </Col>
            )
        )}
      </Row>
    </Container>
  );
}

export default PostIndex;
