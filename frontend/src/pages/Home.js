import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h2>Welcome to Store Rating System</h2>
      <p>Rate stores and explore the best-rated businesses in your area.</p>
      <Link to="/register">
        <Button variant="primary" className="m-2">Sign Up</Button>
      </Link>
      <Link to="/login">
        <Button variant="outline-primary" className="m-2">Login</Button>
      </Link>
    </Container>
  );
};

export default Home;
