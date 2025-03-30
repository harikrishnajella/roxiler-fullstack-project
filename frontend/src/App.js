import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AdminDashboard from "./Dashboard/AdminDashboard";
import StoreOwnerDashboard from "./Dashboard/StoreOwnerDashboard";
import UserDashboard from "./Dashboard/UserDashboard";
import StoreList from "./Stores/StoreList";
import StoreDetails from "./Stores/StoreDetails";
import RateStore from "./Stores/RateStore";
import {ToastContainer} from 'react-toastify';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

const App = () => { 
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={5000} />
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/dashboard/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/dashboard/store-owner" element={<PrivateRoute><StoreOwnerDashboard /></PrivateRoute>} />
            <Route path="/dashboard/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/stores" element={<PrivateRoute><StoreList /></PrivateRoute>} />
            <Route path="/stores/:id" element={<PrivateRoute><StoreDetails /></PrivateRoute>} />
            <Route path="/stores/:id/rate" element={<PrivateRoute><RateStore /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;