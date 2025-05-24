
import { useState, useEffect } from "react";
import { User } from "@/types";
import { authenticateUser, isUserLoggedIn, getCurrentUser } from "@/services/authService";

export const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isUserLoggedIn();
      const user = getCurrentUser();
      
      setIsSignedIn(authStatus);
      setCurrentUser(user);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = (email: string, password: string): boolean => {
    const user = authenticateUser(email, password);
    
    if (user) {
      localStorage.setItem("cambus_user_auth", JSON.stringify({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().getTime()
      }));
      
      setCurrentUser(user);
      setIsSignedIn(true);
      return true;
    }
    return false;
  };

  const signUp = (userData: { fullName: string; phone: string; email: string; password: string }): User => {
    const mockUser: User = {
      id: `user-${Date.now().toString(36)}`,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone
    };
    
    localStorage.setItem("cambus_user_auth", JSON.stringify({
      userId: mockUser.id,
      userName: mockUser.name,
      userEmail: mockUser.email,
      userPhone: mockUser.phone,
      timestamp: new Date().getTime()
    }));
    
    setCurrentUser(mockUser);
    setIsSignedIn(true);
    return mockUser;
  };

  const signOut = () => {
    localStorage.removeItem("cambus_user_auth");
    setIsSignedIn(false);
    setCurrentUser(null);
  };

  return {
    isSignedIn,
    currentUser,
    isLoading,
    signIn,
    signUp,
    signOut
  };
};
