// src/Stores/StoreDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, ListGroup } from "react-bootstrap";

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch(`https://roxiler-fullstack-project-bakend.onrender.com/api/stores/${id}`)
      .then((res) => res.json())
      .then(setStore);
  }, [id]);

  if (!store) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{store.name}</Card.Title>
          <Card.Text>Address: {store.address}</Card.Text>
          <Card.Text>Overall Rating: {store.rating}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Owner:</strong> {store.owner}</ListGroup.Item>
          <ListGroup.Item><strong>Ratings:</strong> {store.rating}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default StoreDetails;
