
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: string;
  email: string;
  company_name?: string;
  role: 'admin' | 'accountant' | 'viewer';
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  created_at: string;
}

export const authService = {
  async signUp(email: string, password: string, companyName: string) {
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
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
