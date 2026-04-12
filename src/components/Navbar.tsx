
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart2, Lightbulb, HelpCircle, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/auth');
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: (error as { message: string }).message || "Failed to log out",
        variant: "destructive",
      });
    }
  };
  
  return (
    <nav className="w-full bg-card shadow-sm z-10 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary flex items-center">
          <span className="mr-2">💰</span>
          <span>FinAware</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn("flex items-center", 
              location.pathname === "/" ? "bg-muted text-primary" : ""
            )}
          >
            <Link to="/" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              <span>Budget Planner</span>
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn("flex items-center", 
              location.pathname === "/dashboard" ? "bg-muted text-primary" : ""
            )}
          >
            <Link to="/dashboard" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Dashboard</span>
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn("flex items-center", 
              location.pathname === "/suggestions" ? "bg-muted text-primary" : ""
            )}
          >
            <Link to="/suggestions" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              <span>Smart Savings</span>
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn("flex items-center", 
              location.pathname === "/help" ? "bg-muted text-primary" : ""
            )}
          >
            <Link to="/help" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Help</span>
            </Link>
          </Button>
          <Link to="/tracker">Tracker</Link>
          {user ? (
            <div className="flex items-center space-x-2 ml-2 pl-2 border-l">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">{user.email}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="ml-2 pl-2 border-l">
              <Button
                variant="default"
                size="sm"
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
