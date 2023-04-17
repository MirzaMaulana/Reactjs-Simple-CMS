//import component Bootstrap React
import { Container } from "react-bootstrap";
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

      <div className="col-md-11 mx-auto">
        <PostIndex />
      </div>
    </Container>
  );
}

export default Home;
