// src/Dashboard/StoreOwnerDashboard.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

const API_BASE_URL = "https://roxiler-fullstack-project-bakend.onrender.com/api";

const StoreOwnerDashboard = () => {
  const [myStores, setMyStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStore, setNewStore] = useState({ name: "", address: "" });

  const fetchStores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        headers: { "Authorization": `Bearer ${Cookies.get("token")}` }
      });
      const stores = await response.json();
      
      // Replace 'currentOwnerId' with actual user ID stored in token
      const owner = Cookies.get("user");  
      const ownerStores = stores.filter(store => store.owner === owner.id);
      setMyStores(ownerStores);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const addStore = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify(newStore),
      });

      if (!response.ok) throw new Error("Failed to add store");

      const addedStore = await response.json();
      setMyStores([...myStores, addedStore]); // Update UI immediately
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Store Owner Dashboard</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add New Store
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>
                <Button variant="warning" size="sm">Edit</Button>{' '}
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Store Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Store Name</Form.Label>
              <Form.Control 
                type="text" 
                value={newStore.name} 
                onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                value={newStore.address} 
                onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={addStore}>Save Store</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StoreOwnerDashboard;
