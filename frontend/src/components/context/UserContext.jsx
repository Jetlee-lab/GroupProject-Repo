import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

// Create a context for the user
const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Set userRole as null initially
  //const navigate = useNavigate();

  // Function to set the role when the user logs in or signs up
  const updateRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Save the role in local storage
  };

  // On initial load, check if the role is stored in localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole); // If there's a saved role, set it
    }
  }, []);


  return (
    <UserContext.Provider value={{ userRole, updateRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

