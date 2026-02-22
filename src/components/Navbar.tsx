
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound, LogOut, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Horoscope', href: '/horoscope' },
    { name: 'Zodiac Signs', href: '/zodiac' },
    { name: 'Tarot', href: '/tarot' },
    { name: 'About', href: '/about' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 cosmic-glass shadow-lg' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/keshav-uploads/694b1a6a-b8bb-4b13-b5e3-a906213d3bdb.png" 
                  alt="astroJanak Logo" 
                  className="h-10 w-10 object-contain" 
                />
                <span className="ml-2 text-xl font-bold text-cosmic-light text-glow">astroJanak</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-cosmic-light/80 hover:text-cosmic-light rounded-md transition-colors hover:bg-cosmic-light/10 nav-link"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Authentication Buttons/Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative cosmic-border bg-cosmic-dark/40 hover:bg-cosmic-light/20 btn-hover-effect">
                      <span className="mr-2 text-cosmic-light">{user.username}</span>
                      <UserRound className="h-4 w-4 text-cosmic-light" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="cosmic-glass w-56 border-cosmic-light/20">
                    <DropdownMenuLabel className="text-cosmic-light">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-cosmic-light/20" />
                    <DropdownMenuItem className="text-cosmic-light hover:bg-cosmic-light/20 cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="text-cosmic-light hover:bg-cosmic-light/20 cursor-pointer">My Readings</DropdownMenuItem>
                    {user.isAdmin && <DropdownMenuItem className="text-cosmic-light hover:bg-cosmic-light/20 cursor-pointer">Admin Panel</DropdownMenuItem>}
                    <DropdownMenuSeparator className="bg-cosmic-light/20" />
                    <DropdownMenuItem onClick={logout} className="text-destructive hover:bg-destructive/20 focus:text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-cosmic-light hover:bg-cosmic text-cosmic-dark btn-hover-effect"
                >
                  Enter Portal
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu} size="icon" className="text-cosmic-light hover:bg-cosmic-light/20 btn-hover-effect">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-cosmic-light" />
                ) : (
                  <Menu className="h-6 w-6 text-cosmic-light" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="cosmic-glass h-full w-full flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" onClick={toggleMenu} size="icon" className="text-cosmic-light hover:bg-cosmic-light/20 btn-hover-effect">
              <X className="h-6 w-6 text-cosmic-light" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-grow space-y-6 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl text-cosmic-light hover:text-cosmic-accent transition-colors py-2 px-4"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-cosmic-light text-center">
                  <span>Welcome, {user.username}</span>
                </div>
                <Button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  variant="outline"
                  className="w-full border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-light/20 btn-hover-effect"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  toggleMenu();
                }}
                className="w-3/4 bg-cosmic-light hover:bg-cosmic text-cosmic-dark btn-hover-effect"
              >
                Enter Portal
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
