
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarField from '@/components/StarField';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-50">
      <StarField />
      
      <div className="container mx-auto px-4 text-center max-w-2xl z-10 flex flex-col items-center ">
        <div className="animate-float mb-6">
          <img 
            src="/keshav-uploads/e661b3c3-4eb4-4418-9441-b945d5524d70.png" 
            alt="astroJanak Logo" 
            className="h-48 mx-auto object-contain logo-pulse"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cosmic-light text-glow mb-5 animate-fade-in">
          astroJanak Portal
        </h1>
        
        <p className="text-lg md:text-xl text-cosmic-light mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Enter the cosmic realm to manage your celestial dashboard.
        </p>
        
        <Button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-cosmic text-white hover:bg-cosmic-light font-semibold px-10 py-6 text-xl animate-fade-in mb-40 btn-hover-effect shadow-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Access Portal
        </Button>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab="login" 
      />
    </div>
  );
};

export default Index;
