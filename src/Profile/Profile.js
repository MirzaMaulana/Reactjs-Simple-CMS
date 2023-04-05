import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    setProfile(data);
  };
  return (
    <Container>
      <Row>
        <Col md={10} className="mx-auto">
          <Card className="border-0 shadow mt-3 rounded-4">
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <hr />
              <Row>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src="https://www.logolynx.com/images/logolynx/b4/b4ef8b89b08d503b37f526bca624c19a.jpeg"
                    className="mb-3"
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <Card.Text>
                    <strong>Name:</strong> {profile.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {profile.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Role:</strong> {profile.role}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location: </strong>{" "}
                    {profile.alamat == null ? (
                      <i className="text-warning">Tidak Didefinisikan</i>
                    ) : (
                      profile.alamat
                    )}
                  </Card.Text>
                  <Card.Text>
                    <strong>Jenis Kelamin: </strong>{" "}
                    {profile.jenis_kelamin == null ? (
                      <i className="text-warning">Tidak Didefinisikan</i>
                    ) : (
                      profile.jenis_kelamin
                    )}
                  </Card.Text>
                  <Card.Text>
                    <strong>Tanggal Lahir: </strong>
                    {profile.tanggal_lahir == null ? (
                      <i className="text-warning">Tidak Didefinisikan</i>
                    ) : (
                      profile.tanggal_lahir
                    )}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status: </strong>
                    {profile.status === "Active" ? (
                      <b className="badge bg-success px-2">{profile.status}</b>
                    ) : (
                      <b className="badge bg-danger px-2">{profile.status}</b>
                    )}
                  </Card.Text>
                </Col>
                <Col className="mt-3">
                  <Link
                    as={Link}
                    to="/profile/edit"
                    className="btn btn-success"
                  >
                    Edit Profile
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
