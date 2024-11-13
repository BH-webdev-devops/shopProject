'use client'


import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/interfaces'

interface AuthContextType {
  user: any;
  isAuthenticated : boolean;
  loading : boolean;
  products : Product[] | null;
  login: (email: string, password: string) => Promise<any>;
  sentEmail: (from: string, subject: string, text: string) => Promise<any>;
  register: (form: FormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  // Check if there is a token in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchProducts()
    if (token) {
      // Fetch the user data here, or simply set a user status if authenticated
    //   setUser({}); // placeholder for user data
    }
  }, []);

  // Register function
  const register = async (form: FormData) => {
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: form,
    });
    const data = await res.json();
    console.log(data)
    if (data.token) {
      localStorage.setItem('token', data.token);
       setUser(data.user);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data
  };

  // Sent email
  const sentEmail = async (from: string, subject: string, text: string) => {
    const res = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, subject, text }),
    });
    return res;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    fetchProfile()
  
  }, []);
  
  
  const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      if (token) {
      try {
        const res = await fetch(`http://localhost:3001/api/profile`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.status == 200) {
          const data = await res.json()
          setUser(data.user)
          setIsAuthenticated(true)
        }
        else{
          setIsAuthenticated(false)
        }
      }
      catch (err) {
        setIsAuthenticated(false)
        console.log(`Error fetching profile ${err}`)
      }
      finally{
        setLoading(false)
      }
    }
    else{
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/`)
        const data = await response.json();
        setProducts(data)
    }
    catch (err : any) {
        console.log(err.message)
    }
}
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, products, sentEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
