
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

type User = {
  username: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  resetPassword: (email: string, newPassword: string, securityAnswer: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo and for the 
const MOCK_USERS = [
  {
    email: 'admin@astral.com',
    password: 'admin123',
    username: 'Cosmic Admin',
    isAdmin: true,
    securityAnswer: 'new york'
  },
  {
    email: 'user@astral.com',
    password: 'user123',
    username: 'Star Gazer',
    isAdmin: false,
    securityAnswer: 'london'
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('astralUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, securityAnswer, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('astralUser', JSON.stringify(userWithoutPassword));
      toast.success('Welcome back to the cosmos!');
    } else {
      toast.error('Invalid stellar credentials');
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    //added the commit 
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      toast.error('This cosmic email is already registered');
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // In a real app, we would save to DB
    // For demo, we'll just log in the user
    const newUser = { username, email, isAdmin: false };
    setUser(newUser);
    localStorage.setItem('astralUser', JSON.stringify(newUser));
    
    toast.success('Welcome to the celestial journey!');
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('astralUser');
    setUser(null);
    toast.success('You have returned to the cosmos');
  };

  const resetPassword = async (email: string, newPassword: string, securityAnswer: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userIndex = MOCK_USERS.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      toast.error('No cosmic traveler found with this email');
      setIsLoading(false);
      throw new Error('User not found');
    }
    
    // Check security answer
    if (MOCK_USERS[userIndex].securityAnswer.toLowerCase() !== securityAnswer.toLowerCase()) {
      toast.error('Security answer is incorrect');
      setIsLoading(false);
      throw new Error('Invalid security answer');
    }
    
    // In a real app, update password in DB
    // For demo, we'll just update the mock data
    MOCK_USERS[userIndex].password = newPassword;
    
    toast.success('Your cosmic password has been reset');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, resetPassword, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
