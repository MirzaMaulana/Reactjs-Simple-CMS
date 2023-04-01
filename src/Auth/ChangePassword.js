import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/v1/password/change",
        {
          email,
          token,
          password,
          current_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Password Berhasil Di Ubah Silahkan Login");
        navigate("/login");
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
              Create New Password
            </h3>
            <small className="text-secondary text-center">
              Strengthen your account security with a stylish new password
            </small>
            <form onSubmit={changePasswordHandler}>
              <div className="my-3">
                <small className="text-secondary">Email address</small>
                <input
                  type="email"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small className="text-secondary">Token Verification</small>
                <input
                  type="text"
                  className="form-control rounded-3"
                  aria-describedby="emailHelp"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                />
                <div className="form-text mb-3">
                  <small>
                    Enter the token that has been sent to your email
                  </small>
                </div>
                <small className="text-secondary">Password</small>
                <input
                  type="password"
                  className="form-control rounded-3 mb-3"
                  aria-describedby="emailHelp"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small className="text-secondary">Current Password</small>
                <input
                  type="password"
                  className="form-control rounded-3 mb-4"
                  aria-describedby="emailHelp"
                  value={current_password}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
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
export default ChangePassword;
