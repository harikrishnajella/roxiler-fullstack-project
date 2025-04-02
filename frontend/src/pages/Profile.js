import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import Cookies from "js-cookie";


const Profile = () => {
  const [profile, setProfile] = useState(null);

  const token = Cookies.get('token')
  const API_BASE_URL = "https://roxiler-fullstack-project-backend.onrender.com/api";
  
    const fetchUserProfile = async () => {
      try {
          const options = {
              method: "GET",
              headers: {
                authorization: `Bearer ${token}`
              }
          }
          const response = await fetch(`${API_BASE_URL}/users`, options);
          const data = await response.json()
          setProfile(data[0])
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
      fetchUserProfile()
   }, [token]);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h2>My Profile</h2>
        {profile ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
