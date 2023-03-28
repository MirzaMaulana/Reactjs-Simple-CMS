import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        navigate("/posts");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col md="8" className="mx-auto">
          <h3 className="text-center">Login Dulu Masbro</h3>
          <Card className="p-4">
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
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
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
