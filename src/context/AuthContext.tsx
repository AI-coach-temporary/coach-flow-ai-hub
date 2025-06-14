
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Demo mode configuration
const DEMO_MODE_ENABLED = true;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signOut: () => Promise<void>;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cleanup function to remove auth state
const cleanupAuthState = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if demo mode is enabled from localStorage
    const demoMode = localStorage.getItem('demo-mode') === 'true';
    setIsDemoMode(demoMode);

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Disable demo mode when user logs in
        if (session?.user) {
          setIsDemoMode(false);
          localStorage.removeItem('demo-mode');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Signed in successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setLoading(true);
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Check your email for the confirmation link!');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during Google sign in');
    } finally {
      setLoading(false);
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during LinkedIn sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      cleanupAuthState();
      
      await supabase.auth.signOut();
      setIsDemoMode(false);
      localStorage.removeItem('demo-mode');
      
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('demo-mode', 'true');
    navigate('/');
    toast.success('Demo mode enabled! Exploring with sample data.');
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem('demo-mode');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoMode,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithLinkedIn,
        signOut,
        enableDemoMode,
        disableDemoMode
      }}
    >
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
