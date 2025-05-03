
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="w-full bg-furia-black border-b border-furia-gray py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-furia-gold text-2xl font-bold">
            FURIA
          </div>
          <div className="text-furia-white text-lg">Fan Finder</div>
        </div>
        
        {/* Menu para tela desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-furia-white hover:text-furia-gold transition-colors">
            Início
          </Link>
          <Link to="/profile" className="text-furia-white hover:text-furia-gold transition-colors">
            Perfil
          </Link>
          <Link to="/metrics" className="text-furia-white hover:text-furia-gold transition-colors">
            Engajamento
          </Link>
          <Link to="/connect" className="text-furia-white hover:text-furia-gold transition-colors">
            Conectar
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="hidden md:flex border-furia-gold text-furia-gold hover:bg-furia-gold hover:text-black"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="mr-2" />
            Perfil
          </Button>
          <Button 
            className="bg-furia-gold text-furia-black hover:bg-opacity-80 font-medium"
            onClick={() => navigate('/')}
          >
            <Settings size={16} className="mr-2" />
            Personalizar
          </Button>
          
          {/* Menu hambúrguer para mobile */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-furia-gray text-furia-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="w-4 space-y-1">
              <span className={`block h-0.5 bg-current transform transition ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 bg-current transition ${showMobileMenu ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 bg-current transform transition ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {showMobileMenu && (
        <div className="md:hidden container py-4 space-y-3 animate-fade-in">
          <Link 
            to="/" 
            className="block py-2 border-b border-furia-gray text-furia-white hover:text-furia-gold"
            onClick={() => setShowMobileMenu(false)}
          >
            Início
          </Link>
          <Link 
            to="/profile" 
            className="block py-2 border-b border-furia-gray text-furia-white hover:text-furia-gold"
            onClick={() => setShowMobileMenu(false)}
          >
            Perfil
          </Link>
          <Link 
            to="/metrics" 
            className="block py-2 border-b border-furia-gray text-furia-white hover:text-furia-gold"
            onClick={() => setShowMobileMenu(false)}
          >
            Engajamento
          </Link>
          <Link 
            to="/connect" 
            className="block py-2 border-b border-furia-gray text-furia-white hover:text-furia-gold"
            onClick={() => setShowMobileMenu(false)}
          >
            Conectar
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
