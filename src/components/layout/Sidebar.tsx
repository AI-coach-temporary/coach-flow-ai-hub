
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart, 
  Settings,
  Kanban,
  LogOut,
  LogIn,
  Play,
  Crown
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut, isDemoMode, disableDemoMode } = useAuth();
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Leads', icon: <Kanban size={20} />, path: '/leads' },
    { name: 'Clients', icon: <Users size={20} />, path: '/clients' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/calendar' },
    { name: 'Campaigns', icon: <MessageSquare size={20} />, path: '/campaigns' },
    { name: 'Reports', icon: <BarChart size={20} />, path: '/reports' },
    { name: 'AI Assistant', icon: <Settings size={20} />, path: '/ai-assistant' },
    { name: 'Admin', icon: <Settings size={20} />, path: '/admin' },
  ];

  const handleSignOut = () => {
    signOut();
  };

  const handleDisableDemoMode = () => {
    disableDemoMode();
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
          Expansions AI Hub
        </h1>
        {isDemoMode && (
          <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
            <Play className="w-3 h-3 mr-1" />
            Demo Mode
          </Badge>
        )}
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="px-4">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 mt-2 text-gray-700 rounded-md hover:bg-brand-light hover:text-brand-primary transition-all duration-200 hover:scale-[1.02] ${
                location.pathname === item.path ? 'bg-brand-light text-brand-primary' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {isDemoMode ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Play size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs text-gray-500">Exploring features</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDisableDemoMode}
                className="w-full text-xs hover:bg-gray-50 transition-colors"
              >
                <LogIn size={14} className="mr-1" />
                Sign In Instead
              </Button>
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 max-w-[160px]">
                <p className="text-sm font-medium truncate">{user?.email || 'User'}</p>
                <div className="flex items-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-500" />
                  <p className="text-xs text-gray-500">Pro Account</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSignOut}
              title="Sign Out"
              className="ml-auto hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                G
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Guest User</p>
                <p className="text-xs text-gray-500">Limited Access</p>
              </div>
            </div>
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="icon"
                title="Sign In"
                className="ml-auto hover:bg-brand-light hover:text-brand-primary transition-colors"
              >
                <LogIn size={18} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
