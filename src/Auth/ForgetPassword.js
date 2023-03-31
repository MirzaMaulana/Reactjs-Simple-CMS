import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  return (
    <Container>
      <Row>
        <Col md="5" className="mx-auto">
          <Card className="px-4 pt-3 rounded-4 mt-5">
            <h3 className="text-center" style={{ fontFamily: "Roboto Slab" }}>
              Reset Your Password
            </h3>
            <small className="text-secondary text-center">
              input your email address account to receive to reset link
            </small>
            <form>
              <div className="my-3">
                <small className="form-label">Email address</small>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <button type="submit" className="mb-3 btn btn-success w-100">
                Continue
              </button>
            </form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default ForgetPassword;
