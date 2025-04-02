import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import RatingForm from './components/RatingForm';
import StoreManagement from './components/StoreManagement';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
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
            <Route path="/rating-form" element={<PrivateRoute><RatingForm /></PrivateRoute>} />
            <Route path="/store-management" element={<PrivateRoute><StoreManagement /></PrivateRoute>} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;