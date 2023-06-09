import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Berhasil logout");
    navigate("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="sticky-top"
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex text-dark"
          style={{ fontFamily: "Roboto Slab" }}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="mx-2"
            width={30}
            height={30}
          />
          News Reporting
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="nav-link ms-5">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts" className="nav-link">
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="nav-link">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link">
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <NavDropdown title="Welcome Back" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/posts/list">
                  <i className="bi bi-grid-fill"></i> Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-light bg-dark "
                >
                  <i className="bi bi-box-arrow-left"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="btn btn-dark ms-2 text-light nav-link"
                >
                  SignUp
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNav;
