import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";

const RatingForm = () => {
    const [userId, setUserId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [rating, setRating] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [stores, setStores] = useState([]);

    const token = Cookies.get('token')
    const API_BASE_URL = "https://roxiler-fullstack-project-backend.onrender.com/api";
    
    useEffect(() => {
        axios.get(`${API_BASE_URL}/stores`, {
            headers: { Authorization: `Bearer ${token}` 
        }})
            .then(res => setStores(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/ratings`, {
                user_id: userId,
                store_id: storeId,
                rating,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUserId('')
            setStoreId('')
            setRating('')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Submit a Rating</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userId">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="storeId">
                    <Form.Label>Select Store</Form.Label>
                    <Form.Control as="select" value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
                        <option value="">Select a Store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)} required>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="mt-3">Submit Rating</Button>
            </Form>
        </Container>
    );
};

export default RatingForm;
