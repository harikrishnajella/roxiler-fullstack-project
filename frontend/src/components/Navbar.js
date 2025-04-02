//src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Button, Container } from "react-bootstrap";
import Cookies from "js-cookie"

const Navbar = () => {
  const token = Cookies.get("token")
  const navigate = useNavigate()
  
  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    navigate('/')
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        {token ? 
        <BootstrapNavbar.Brand as={Link} to="/dashboard">
        Store Rating App
      </BootstrapNavbar.Brand>
      :
        <BootstrapNavbar.Brand as={Link} to="/">
          Store Rating App
        </BootstrapNavbar.Brand>
     }
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* {user && (
              <Nav.Link as={Link} to="/stores">
                Stores
              </Nav.Link>
            )} */}
          </Nav>
          <Nav>
            {token ? (
              <>
              <Nav.Link as={Link} to="/rating-form">
                 RatingForm
                </Nav.Link>
                <Nav.Link as={Link} to="/store-management">
                StoreManagement
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Button variant="outline-light" onClick={logout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

