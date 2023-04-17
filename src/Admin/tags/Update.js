import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../component/Sidebar";

function UpdateTags() {
  const [name, setName] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //mengupdate value post
  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `http://localhost:8000/api/v1/tag/update/${id}`,
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.status);
        navigate("/dashboard/tags/list");
        toast.success("Berhasil Mengupdate Tag");
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.danger("Terjadi Kesalahan Sistem,Silahkan Coba Lagi Nanti");
      });
  };
  return (
    <Container>
      <Row>
        <Col
          md={2}
          className="shadow mt-4 rounded-3 px-3 fixed"
          style={{ height: 500 }}
        >
          <Sidebar />
        </Col>
        <Col md={7} className="mx-auto mt-4">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <h3
                className="text-center my-0"
                style={{ fontFamily: "Roboto Slab" }}
              >
                Update Tags
              </h3>
              <form onSubmit={updateHandler}>
                <div className="mb-3">
                  <label className="form-label">Name Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <Button type="submit" variant="success">
                  Update Tags
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateTags;
