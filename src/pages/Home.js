//import component Bootstrap React
import { Alert, Carousel, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

function Home() {
  const [show, setShow] = useState(true);
  return (
    <Container>
      {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Website ini masih dalam pengembangan!!
        </Alert>
      )}
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/600x400"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/600x400"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/600x400"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <Row>
            <Col md="{12}" className="my-2 d-flex">
              <img src="https://source.unsplash.com/random/150x100" />
              <div className="mx-2">
                <h5>Berita Terkini</h5>
                <p>
                  Website is still under development and being developed using
                  React JS
                </p>
              </div>
            </Col>
            <Col md="{12}" className="my-2 d-flex">
              <img src="https://source.unsplash.com/random/150x100" />
              <div className="mx-2">
                <h5>Berita Terkini</h5>
                <p>
                  Website is still under development and being developed using
                  React JS
                </p>
              </div>
            </Col>
            <Col md="{12}" className="my-2 d-flex">
              <img src="https://source.unsplash.com/random/150x100" />
              <div className="mx-2">
                <h5>Berita Terkini</h5>
                <p>
                  Website is still under development and being developed using
                  React JS
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
