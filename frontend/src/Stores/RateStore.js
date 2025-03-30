// src/Stores/RateStore.js
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const RateStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://roxiler-fullstack-project-backend.onrender.com/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeId: id, rating }),
    });
    navigate("/stores");
  };

  return (
    <Container className="mt-5">
      <h2>Rate Store</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="success" className="mt-3" type="submit">
          Submit Rating
        </Button>
      </Form>
    </Container>
  );
};

export default RateStore;
