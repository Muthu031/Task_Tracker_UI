import React from 'react';

interface UserProfileProps {
    username: string;
  phone: number;
  address: string;
  pin: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, phone, address, pin }) => {
  return (
    <div className="user-profile">
       <h2>User Profile</h2>
      <div>Name: {username}</div>
      <div>Phone: {phone}</div>
      <div>Address: {address}</div>
      <div>Pin: {pin}</div>
    </div>
  );
};

export default UserProfile;