
// Simulates authentication services that would typically connect to a backend

import { User } from "@/types";

// User authentication
export const authenticateUser = (email: string, password: string): User | null => {
  // In a real app, this would make an API call to verify credentials
  // For demo purposes, we accept any non-empty credentials
  if (email && password) {
    return {
      id: `user-${Date.now().toString(36)}`,
      name: email.split('@')[0], // Extract name from email
      email: email
    };
  }
  return null;
};

// Check if a user is logged in
export const isUserLoggedIn = (): boolean => {
  const userAuth = localStorage.getItem("cambus_user_auth");
  if (!userAuth) return false;
  
  try {
    const parsed = JSON.parse(userAuth);
    // Check if session is less than 24 hours old
    const isValid = parsed.timestamp && 
      (new Date().getTime() - parsed.timestamp) < 24 * 60 * 60 * 1000;
    return isValid;
  } catch (e) {
    return false;
  }
};

// Check if admin is logged in
export const isAdminLoggedIn = (): boolean => {
  const adminAuth = localStorage.getItem("cambus_admin_auth");
  if (!adminAuth) return false;
  
  try {
    const parsed = JSON.parse(adminAuth);
    // Check if admin session is less than 24 hours old
    const isValid = parsed.timestamp && 
      (new Date().getTime() - parsed.timestamp) < 24 * 60 * 60 * 1000;
    return isValid && parsed.isAdmin;
  } catch (e) {
    return false;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userAuth = localStorage.getItem("cambus_user_auth");
  if (!userAuth) return null;
  
  try {
    const parsed = JSON.parse(userAuth);
    if (isUserLoggedIn()) {
      return {
        id: parsed.userId,
        name: parsed.userName,
        email: parsed.userEmail
      };
    }
    return null;
  } catch (e) {
    return null;
  }
};
