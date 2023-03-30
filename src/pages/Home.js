//import component Bootstrap React
import { Container } from "react-bootstrap";
import "./Home.css";
import React from "react";
import PostIndex from "./posts/Index";

function Home() {
  return (
    <Container>
      <div className="jumbotron jumbotron-fluid my-5">
        <div className="container text-center">
          <h1 className="display-5">Best Of The Week</h1>
          <p className="lead" style={{ fontFamily: "Roboto Slab" }}>
            Delivering the Latest, In-Depth, and Accurate News to Expand Your
            Insights.
          </p>
        </div>
      </div>
      <div className="header text-center col-md-11 mx-auto">
        <img
          src="https://source.unsplash.com/random/1100x500"
          alt="Web berita"
          className="img-fluid mt-3"
        />
        <div
          className="title card position-absolute p-1 shadow mb-3"
          style={{ marginTop: -50 }}
        >
          <div className="card-body text-start">
            <small className="text-secondary">Olivia Rhye • 30 Mar 2023</small>
            <h3 className="card-title" style={{ fontFamily: "Roboto Slab" }}>
              The Impact of Technology on Modern Society
            </h3>
            <p className="card-text">
              Technology has become an integral part of modern society, with
              advancements in communication.
            </p>
            <div className="category">
              <small className="me-2">Technology</small>
              <small className="me-2">Design</small>
              <small className="me-2">Programming</small>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-11 mx-auto">
        <PostIndex />
      </div>
    </Container>
  );
}

export default Home;
