import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Nav className="flex-column rounded-4" id="sidebar">
      <Nav.Link
        as={Link}
        to="/"
        className="fs-5 text-dark border-bottom border-dark mb-2"
        style={{ fontFamily: "Roboto Slab" }}
      >
        <i className="bi bi-columns-gap text-success"></i> Dashboard
      </Nav.Link>

      <NavDropdown
        title={
          <span className="bi bi-journal text-dark fs-5">
            <span className="mx-3">Posts</span>
          </span>
        }
        align="end"
      >
        <NavDropdown.Item as={Link} to="/dashboard/posts/create">
          Create
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/dashboard/posts/list">
          List
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default Sidebar;
