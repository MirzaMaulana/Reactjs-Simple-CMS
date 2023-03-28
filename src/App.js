import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import PostIndex from "./pages/posts/Index";
import PostCreate from "./pages/posts/Create";
import PostEdit from "./pages/posts/Edit";
import PostShow from "./pages/posts/show";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Berhasil logout");
  };

  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src="/logo.png" alt="logo" width={30} />
              <b className="m-2" style={{ fontFamily: "Newsreader" }}>
                News Reporting
              </b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/posts" className="nav-link">
                  Posts
                </Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link onClick={handleLogout} className="nav-link ms-auto">
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login" className="nav-link ms-auto">
                    Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostIndex />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/post/:id" element={<PostShow />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
