//import component Bootstrap React
import { Navbar, Container, Nav } from "react-bootstrap";
//import react router dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import component Home
import Home from "./pages/Home";

//import component Post Index
import PostIndex from "./pages/posts/Index";

//import component Post Create
import PostCreate from "./pages/posts/Create";

//import component Post Edit
import PostEdit from "./pages/posts/Edit";

import PostShow from "./pages/posts/show";

function App() {
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
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to="/posts" className="nav-link">
                  POSTS
                </Nav.Link>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
