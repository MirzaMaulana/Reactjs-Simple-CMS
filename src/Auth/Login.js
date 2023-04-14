import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
        console.log(response.data.status);
        localStorage.setItem("token", response.data.token);

        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col md="5" className="mx-auto">
          <Card className="px-4 pt-3 rounded-4 mt-5">
            <h3 className="text-center" style={{ fontFamily: "Roboto Slab" }}>
              Login
            </h3>
            <small className="text-secondary text-center">
              Login and lets get started
            </small>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
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
              <div className="mb-3">
                <small className="form-label">Password</small>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <p className="text-end">
                <Link
                  as={Link}
                  to="/forget-password"
                  className="text-decoration-none text-success"
                >
                  Forget Password?
                </Link>
              </p>

              <button type="submit" className="mb-3 btn btn-success w-100">
                Submit
              </button>
              <p className="text-center">
                Don't have an account yet?
                <Link
                  as={Link}
                  to="/signup"
                  className="ms-2 text-decoration-none text-success"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
