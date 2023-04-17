import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ProfileEdit() {
  const [name, setName] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    dataProfile();
  }, []);

  const dataProfile = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    setName(data.name);
    setJenisKelamin(data.jenis_kelamin);
    setAlamat(data.alamat);
    setTanggalLahir(data.tanggal_lahir);
  };

  const editHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        "http://localhost:8000/api/v1/profile/update",
        {
          name,
          jenis_kelamin,
          alamat,
          tanggal_lahir,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        navigate("/profile");
      })
      .catch((error) => {
        toast.danger(error.response.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto mt-4">
          <Card className="p-4 rounded-4">
            <div className="d-flex justify-content-between">
              <div>
                <h3>Edit Profile</h3>
                <p className="text-secondary">
                  Please fill in the appropriate fields
                </p>
              </div>
              <Link
                as={Link}
                to="/profile"
                className="bi bi-arrow-left-square fs-2 text-success"
              ></Link>
            </div>

            <form onSubmit={editHandler}>
              <small>Username</small>
              <input
                type="text"
                className="form-control rounded-3 mb-3"
                aria-describedby="emailHelp"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Row>
                <Col md={7}>
                  <small>Gender</small>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={jenis_kelamin}
                    onChange={(event) => setJenisKelamin(event.target.value)}
                  >
                    <option selected>Pilih Salah Satu</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </Col>
                <Col md={5}>
                  <small>BirthDate</small>
                  <input
                    type="date"
                    className="form-control rounded-3 mb-3"
                    aria-describedby="emailHelp"
                    value={tanggal_lahir}
                    onChange={(event) => setTanggalLahir(event.target.value)}
                  />
                </Col>
              </Row>
              <small>My Address</small>
              <input
                type="text"
                className="form-control rounded-3 mb-4"
                aria-describedby="emailHelp"
                value={alamat}
                onChange={(event) => setAlamat(event.target.value)}
              />
              <Button type="submit" className="btn btn-success w-100">
                Update
              </Button>
            </form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileEdit;
