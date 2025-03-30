// src/Stores/StoreList.js
import { useEffect, useState } from "react";
import { fetchStores } from "../services/api";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores().then(setStores);
  }, []);

  const filteredStores = stores.filter(
    (store) => store.name.toLowerCase().includes(search.toLowerCase()) || 
               store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2>Store List</h2>
      <Form.Control
        type="text"
        placeholder="Search by name or address"
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
          {filteredStores.map((store) => (
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

export default StoreList;
