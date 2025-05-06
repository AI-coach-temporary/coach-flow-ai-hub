
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
  LogIn
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut, bypassAuth } = useAuth();
  
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

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
          Expansions AI Hub
        </h1>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="px-4">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 mt-2 text-gray-700 rounded-md hover:bg-brand-light hover:text-brand-primary ${
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
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          {user || !bypassAuth ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 max-w-[160px]">
                  <p className="text-sm font-medium truncate">{user?.email || 'User'}</p>
                  <p className="text-xs text-gray-500">Coach Account</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSignOut}
                title="Sign Out"
                className="ml-auto"
              >
                <LogOut size={18} />
              </Button>
            </>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  G
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Guest User</p>
                  <p className="text-xs text-gray-500">Demo Mode</p>
                </div>
              </div>
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="icon"
                  title="Sign In"
                  className="ml-auto"
                >
                  <LogIn size={18} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
