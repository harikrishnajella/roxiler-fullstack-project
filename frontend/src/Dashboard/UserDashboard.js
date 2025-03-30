// src/Dashboard/UserDashboard.js
import { useEffect, useState } from "react";
import { fetchStores } from "../services/api";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores().then(setStores);
  }, []);

  return (
    <Container className="mt-5">
      <h2>User Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.rating}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => navigate(`/stores/${store.id}`)}>View</Button>{' '}
                <Button variant="success" size="sm" onClick={() => navigate(`/stores/${store.id}/rate`)}>Rate</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserDashboard;
