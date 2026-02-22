import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Key } from "lucide-react";

const securityQuestion = "In which city were you born?";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "reset";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { login, resetPassword } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    setPasswordError("");
    setIsSubmitting(true);
    
    try {
      await resetPassword(email, newPassword, securityAnswer);
      setNewPassword("");
      setConfirmPassword("");
      setSecurityAnswer("");
      setActiveTab("login");
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white/95 max-w-md w-full p-6 animate-fade-in fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl border border-cosmic-accent/30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-cosmic-accent/10 opacity-90 rounded-2xl"></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="flex flex-col items-center gap-3 mb-4">
            <div className="animate-float">
              <img 
                src="/keshav-uploads/e661b3c3-4eb4-4418-9441-b945d5524d70.png" 
                alt="astroJanak Logo" 
                className="h-24 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-cosmic mt-3">
              astroJanak Access Portal
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "reset")} className="relative z-10 w-full mt-2">
          <TabsList className="grid grid-cols-2 w-full bg-white/70 rounded-lg">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-cosmic data-[state=active]:text-white transition-all duration-300 text-cosmic font-medium"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="reset" 
              className="data-[state=active]:bg-cosmic data-[state=active]:text-white transition-all duration-300 text-cosmic font-medium"
            >
              Reset Password
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cosmic-dark font-medium">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astrojanak.com"
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-cosmic-dark font-medium">Password</Label>
                  <button 
                    type="button" 
                    className="text-cosmic text-xs hover:text-cosmic-accent transition-colors font-medium"
                    onClick={() => setActiveTab("reset")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic hover:bg-cosmic-accent hover:scale-[1.02] active:scale-[0.98] text-white font-semibold transition-all duration-300 btn-hover-effect shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
                    Connecting...
                  </span>
                ) : (
                  'Enter the Portal'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="reset" className="space-y-4 mt-4">
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-cosmic-dark font-medium">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astrojanak.com"
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security-q" className="text-cosmic-dark font-medium">{securityQuestion}</Label>
                <div className="relative group">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="security-q"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-cosmic-dark font-medium">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-cosmic-dark font-medium">Confirm New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-white/90 border-cosmic/30 focus:border-cosmic text-cosmic-dark font-medium transition-all duration-300 hover:bg-white"
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm font-medium">{passwordError}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic hover:bg-cosmic-accent hover:scale-[1.02] active:scale-[0.98] text-white font-semibold transition-all duration-300 btn-hover-effect shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full text-cosmic hover:text-white hover:bg-cosmic transition-all duration-300 border-cosmic/30"
                onClick={() => setActiveTab("login")}
              >
                Back to Login
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
