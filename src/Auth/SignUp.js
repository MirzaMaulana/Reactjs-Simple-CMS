import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfrimPassword] = useState("");

  const navigate = useNavigate();

  const RegisterHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/v1/register",
        {
          name,
          email,
          password,
          confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="mx-auto mt-3">
          <Card className="rounded-4 px-2">
            <h3
              className="text-center pt-3"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Create New Account
            </h3>
            <p className="text-center text-secondary">
              please register by filling in your personal data
            </p>
            <div className="card-body">
              <form onSubmit={RegisterHandler}>
                <small className="text-secondary">Username</small>
                <input
                  type="text"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <small className="text-secondary">Email address</small>
                <input
                  type="email"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small className="text-secondary">Password</small>
                <input
                  type="password"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small className="text-secondary">Confirm Password</small>
                <input
                  type="password"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={confirm_password}
                  onChange={(event) => setConfrimPassword(event.target.value)}
                />
                <button className="btn btn-success w-100 mb-2">Register</button>
                <p className="text-center mb-0">
                  Already have an account?
                  <Link
                    as={Link}
                    to="/login"
                    className="ms-2 text-decoration-none text-success"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
