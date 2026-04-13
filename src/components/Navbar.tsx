
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart2, Lightbulb, HelpCircle, LogOut, User, BarChart } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
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
            
          </Button>
          <Button
  variant="ghost"
  size="sm"
  asChild
  className={cn(
    "flex items-center",
    location.pathname === "/tracker" ? "bg-muted text-primary" : ""
  )}
>
  <Link to="/tracker" className="flex items-center">
    <HelpCircle className="h-4 w-4 mr-2" />
    <span>Tracker</span>
  </Link>
</Button>
          {user ? (
  <div className="relative ml-2 pl-2 border-l">
    
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setOpen(!open)}
      className="flex items-center"
    >
      <User className="h-4 w-4 mr-2" />
      <span className="hidden md:inline">{user.email}</span>
    </Button>

    {open && (
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
        
        <button
          onClick={() => {
            navigate("/help");
            setOpen(false);
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Help
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>

      </div>
    )}
  </div>
) : (
  <div className="ml-2 pl-2 border-l">
    <Button variant="default" size="sm" asChild>
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
