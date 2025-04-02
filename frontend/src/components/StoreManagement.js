import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from "js-cookie";

const StoreManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [stores, setStores] = useState([]);
    const [openForm, setOpenForm] = useState(false)
    
    const token = Cookies.get('token')
    const API_BASE_URL = "https://roxiler-fullstack-project-backend.onrender.com/api";

  const fetchStores = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(`${API_BASE_URL}/stores`, options);
        const data = await response.json()
        console.log(response)
        console.log(data)
        toast.success(data.message)
        setStores(data.stores)
    } catch (err) {
        console.error(err);
    }
};

  useEffect(() => {
    fetchStores()
  }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/stores`, {
                name,
                email,
                address,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setOpenForm((prev) => !prev)
            setName('')
            setEmail('')
            setAddress('')
            fetchStores();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const addStore = () => setOpenForm((prev) => !prev)

    return (
        <Container className="mt-4">
            <h2 onClick={addStore}>Store Management</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {!openForm && <Button variant="primary" className="mb-3" onClick={addStore}>Add New Store</Button>}
            {openForm &&
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Button type="submit" className="mt-3">Submit</Button>
            </Form>
            }
            <h3 className="mt-5">Store List</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.email}</td>
                            <td>{store.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StoreManagement;
