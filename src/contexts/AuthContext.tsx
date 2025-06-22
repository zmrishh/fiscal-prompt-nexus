
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, companyName: string) => Promise<any>;
  signOut: () => Promise<void>;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isMockMode = import.meta.env.VITE_SUPABASE_URL === undefined || 
                   import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current auth state
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result.data?.user) {
      if (isMockMode) {
        // Set mock login state
        localStorage.setItem('mock_logged_in', 'true');
        setUser(result.data.user);
      } else {
        const transformedUser = await authService.getCurrentUser();
        setUser(transformedUser);
      }
    }
    return result;
  };

  const signUp = async (email: string, password: string, companyName: string) => {
    const result = await authService.signUp(email, password, companyName);
    if (result.data?.user) {
      if (isMockMode) {
        // Set mock login state
        localStorage.setItem('mock_logged_in', 'true');
        setUser(result.data.user);
      } else {
        const transformedUser = await authService.getCurrentUser();
        setUser(transformedUser);
      }
    }
    return result;
  };

  const signOut = async () => {
    await authService.signOut();
    if (isMockMode) {
      localStorage.removeItem('mock_logged_in');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isMockMode }}>
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
