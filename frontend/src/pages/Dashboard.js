import React from "react";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "500px"}} className="text-center mt-5 ">
      <h1>Welcome to Store Rating System</h1>
      <p>Rate stores and explore the best-rated businesses in your area.</p>
    </Container>
  );
};

export default Dashboard;
