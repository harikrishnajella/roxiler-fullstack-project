import React, { useContext, useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (user) {
      setProfile(user)
    }
  }, [user]);

  if (!user) {
    return <p className="text-center">Please log in to view your profile.</p>;
  }

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
