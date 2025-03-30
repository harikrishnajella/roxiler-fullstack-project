// src/Dashboard/AdminDashboard.js

import { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie"



const AdminDashboard = () => {
  const [stores, setStores] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false)
  const [storeData, setStoreData] = useState({ name: "", email: "", address: "" });

  // Fetch stores from backend
  const fetchStores = async () => {
    const API_BASE_URL = "http://localhost:5000/api";
    try {
      const response = await fetch(`${API_BASE_URL}/stores`);
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  // Handle store submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token"); // Get the token from cookies
    console.log(token)
    console.log(storeData)
    try {
      if (!token) {
        console.error("No token found, authorization failed.");
        return;
      }
      const API_BASE_URL = "http://localhost:5000/api";
      const response = await fetch(`${API_BASE_URL}/stores`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(storeData),
      });

      if (response.ok) {
        setStoreData({ name: "", email: "", address: "" }); // Clear form
        fetchStores(); // Refresh store list
      } else {
        console.error("Failed to add store");
      }
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const addStore = () => setOpenAddForm(true)

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      {!openAddForm && <Button variant="primary" className="mb-3" onClick={addStore}>Add New Store</Button>}

      {openAddForm &&
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group>
          <Form.Label>Store Name</Form.Label>
          <Form.Control type="text" name="name" value={storeData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={storeData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={storeData.address} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Add Store
        </Button>
      </Form>
}
      {/* Store List */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
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

export default AdminDashboard;





// import { useEffect, useState } from "react";
// //import { fetchStores } from "../services/api";
// import { Container, Table, Button } from "react-bootstrap";

// const AdminDashboard = () => {
//   const [stores, setStores] = useState([]);

//   const fetchStores = async () => {
//     const API_BASE_URL = "http://localhost:5000/api";

//     const response = await fetch(`${API_BASE_URL}/users`);
//     const data = await response.json();
//     console.log("fetchStores", response)
//     console.log("fetchStores", data)
//     setStores(data);
//   };

//   useEffect(() => {
//     fetchStores()
//   }, []);

//   return (
//     <Container className="mt-5">
//       <h2>Admin Dashboard</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Store Name</th>
//             <th>Owner</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stores.map((store) => (
//             <tr key={store.id}>
//               <td>{store.name}</td>
//               <td>{store.owner}</td>
//               <td>{store.address}</td>
//               <td>
//                 <Button variant="danger" size="sm">Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default AdminDashboard;
