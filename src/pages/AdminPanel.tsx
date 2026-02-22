
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Bell, Sun, FileText, Users, 
  Package, Settings, Star, LogOut, 
  LayoutDashboard, Book, Contact, CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, 
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, 
  SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/components/admin/AdminDashboard';
import HoroscopeManager from '@/components/admin/HoroscopeManager';
import UserManager from '@/components/admin/UserManager';
import OrderManager from '@/components/admin/OrderManager';
import ContentManager from '@/components/admin/ContentManager';
import AdminSettings from '@/pages/settings/AdminSettings';
import KundliManager from '@/components/admin/KundliManager';
import PaymentManager from '@/components/admin/PaymentManager';
import AboutPage from '@/pages/About';
import BlogPage from '@/pages/Blog';
import ContactPage from '@/pages/Contact';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState('dashboard');
  const [notifications] = useState(3);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleMenuClick = (view) => {
    setCurrentView(view);
    toast({
      title: `${view.charAt(0).toUpperCase() + view.slice(1)} View`,
      description: `Switched to ${view} view.`,
      duration: 2000,
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <div className="dashboard-content p-6"><AdminDashboard /></div>;
      case 'settings':
        return <AdminSettings />;
      case 'horoscopes':
        return <HoroscopeManager />;
      case 'users':
        return <UserManager />;
      case 'orders':
        return <OrderManager />;
      case 'content':
        return <ContentManager />;
      case 'kundli':
        return <KundliManager />;
      case 'payments':
        return <PaymentManager />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <div className="dashboard-content p-6"><AdminDashboard /></div>;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-white to-cosmic/5">
        {/* Sidebar */}
        <Sidebar className="admin-sidebar border-cosmic/20 shadow-md animate-fade-in">
          <SidebarHeader>
            <div className="flex items-center px-2">
              <img 
                src="/keshav-uploads/a05f37b6-9dd7-431e-aa94-20ce9e891375.png" 
                alt="astroJanak Logo" 
                className="h-12 w-36 object-contain logo-pulse" 
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-cosmic font-medium">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'dashboard'} 
                      tooltip="Dashboard"
                      onClick={() => handleMenuClick('dashboard')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'orders'} 
                      tooltip="Orders"
                      onClick={() => handleMenuClick('orders')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Package className="h-4 w-4" />
                      <span>Orders</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'horoscopes'} 
                      tooltip="Horoscopes"
                      onClick={() => handleMenuClick('horoscopes')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Star className="h-4 w-4" />
                      <span>Horoscopes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-cosmic font-medium">Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'about'} 
                      tooltip="About"
                      onClick={() => handleMenuClick('about')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Book className="h-4 w-4" />
                      <span>About</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'blog'} 
                      tooltip="Blog"
                      onClick={() => handleMenuClick('blog')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Blog</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'contact'} 
                      tooltip="Contact"
                      onClick={() => handleMenuClick('contact')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Contact className="h-4 w-4" />
                      <span>Contact</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-cosmic font-medium">Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'kundli'} 
                      tooltip="Kundli Manager"
                      onClick={() => handleMenuClick('kundli')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Star className="h-4 w-4" />
                      <span>Kundli Manager</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'users'} 
                      tooltip="User Manager"
                      onClick={() => handleMenuClick('users')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Users className="h-4 w-4" />
                      <span>User Manager</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'content'} 
                      tooltip="Content Manager"
                      onClick={() => handleMenuClick('content')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Content Manager</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'payments'} 
                      tooltip="Payment Manager"
                      onClick={() => handleMenuClick('payments')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Payment Manager</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-cosmic font-medium">System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === 'settings'}
                      tooltip="Settings"
                      onClick={() => handleMenuClick('settings')}
                      className={`transition-all duration-300 text-cosmic-dark`}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-2">
              <Button
                onClick={logout}
                variant="outline"
                className="w-full justify-start text-cosmic-dark hover:bg-cosmic/20 hover:text-cosmic border-cosmic/30 btn-hover-effect"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <nav className="bg-white/80 backdrop-blur-xl border-b border-cosmic/30 sticky top-0 z-50 animate-fade-in shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-cosmic text-glow">
                    {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
                  </span>
                  <div className="ml-4 relative">
                    <Input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-60 bg-white/80 border-cosmic/30 text-cosmic-dark"
                      onChange={() => toast({ title: "Search", description: "Search functionality coming soon" })}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative animate-fade-in hover:bg-cosmic/10 btn-hover-effect text-cosmic-dark"
                    onClick={() => toast({ 
                      title: "Notifications", 
                      description: "You have 3 unread notifications" 
                    })}
                  >
                    <Bell className="text-cosmic-dark" />
                    {notifications > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-cosmic rounded-full animate-pulse"></span>
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="animate-fade-in hover:bg-cosmic/10 btn-hover-effect text-cosmic-dark"
                    onClick={() => toast({ 
                      title: "Theme Settings", 
                      description: "Toggle between light and dark mode" 
                    })}
                  >
                    <Sun className="text-cosmic-dark" />
                  </Button>
                  
                  <div className="relative group">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-110 bg-cosmic/10 border border-cosmic/30 avatar-glow">
                      <AvatarFallback className="bg-cosmic/10 text-cosmic">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="absolute right-0 mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                      <div className="bg-white/95 py-2 rounded-md shadow-xl border border-cosmic/20">
                        <div className="px-4 py-2 text-sm text-cosmic-dark">{user.username}</div>
                        <div className="border-t border-cosmic/20"></div>
                        <button
                          onClick={() => handleMenuClick('settings')}
                          className="w-full text-left px-4 py-2 text-sm text-cosmic-dark hover:bg-cosmic/10 transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-cosmic-dark hover:bg-cosmic/10 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="container mx-auto px-4 py-6 admin-content min-h-[calc(100vh-64px)]">
            {renderView()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
