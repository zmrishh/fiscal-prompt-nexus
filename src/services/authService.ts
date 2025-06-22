
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Check if we're in mock mode (no real Supabase credentials)
const isMockMode = supabaseUrl === 'https://placeholder.supabase.co';

export interface User {
  id: string;
  email: string;
  company_name?: string;
  role: 'admin' | 'accountant' | 'viewer';
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  created_at: string;
}

// Mock user data for demo
const mockUser: User = {
  id: 'mock-user-123',
  email: 'demo@company.com',
  company_name: 'Demo Company Ltd',
  role: 'admin',
  subscription_plan: 'professional',
  created_at: new Date().toISOString()
};

// Mock credentials
const DEMO_EMAIL = 'demo@company.com';
const DEMO_PASSWORD = 'demo123';

export const authService = {
  async signUp(email: string, password: string, companyName: string) {
    if (isMockMode) {
      console.log('🔧 Mock Mode: Simulating signup');
      // Simulate signup success
      return {
        data: {
          user: {
            ...mockUser,
            email,
            company_name: companyName
          }
        },
        error: null
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
          role: 'admin',
          subscription_plan: 'basic'
        }
      }
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    if (isMockMode) {
      console.log('🔧 Mock Mode: Attempting login with credentials:', { email, password });
      
      // Check demo credentials
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        console.log('✅ Mock login successful');
        return {
          data: {
            user: mockUser
          },
          error: null
        };
      } else {
        console.log('❌ Mock login failed - invalid credentials');
        return {
          data: null,
          error: { message: 'Invalid email or password. Use demo@company.com / demo123' }
        };
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signOut() {
    if (isMockMode) {
      console.log('🔧 Mock Mode: Signing out');
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    if (isMockMode) {
      // Return mock user if "logged in"
      const isLoggedIn = localStorage.getItem('mock_logged_in') === 'true';
      console.log('🔧 Mock Mode: Getting current user, logged in:', isLoggedIn);
      return isLoggedIn ? mockUser : null;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    // Transform Supabase user to our User interface
    return {
      id: user.id,
      email: user.email || '',
      company_name: user.user_metadata?.company_name,
      role: user.user_metadata?.role || 'admin',
      subscription_plan: user.user_metadata?.subscription_plan || 'basic',
      created_at: user.created_at
    } as User;
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    if (isMockMode) {
      // For mock mode, just call callback immediately with current state
      const isLoggedIn = localStorage.getItem('mock_logged_in') === 'true';
      setTimeout(() => callback(isLoggedIn ? mockUser : null), 100);
      
      // Return a mock subscription object
      return {
        data: {
          subscription: {
            unsubscribe: () => console.log('🔧 Mock subscription unsubscribed')
          }
        }
      };
    }

    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const transformedUser = {
          id: session.user.id,
          email: session.user.email || '',
          company_name: session.user.user_metadata?.company_name,
          role: session.user.user_metadata?.role || 'admin',
          subscription_plan: session.user.user_metadata?.subscription_plan || 'basic',
          created_at: session.user.created_at
        } as User;
        callback(transformedUser);
      } else {
        callback(null);
      }
    });
  }
};
