
import React, { useState } from 'react';
import Header from '@/components/Header';
import SocialConnect from '@/components/SocialConnect';
import { mockFanProfile } from '@/utils/mockData';
import { SocialProfile } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Connect = () => {
  const [socialProfiles, setSocialProfiles] = useState(mockFanProfile.socialProfiles);
  const navigate = useNavigate();
  
  const handleConnectSocial = (platform: SocialProfile['platform']) => {
    // Em um app real, isso abriria um fluxo OAuth
    // Por enquanto, apenas alterna o estado de conexão
    const updatedProfiles = socialProfiles.map(profile => {
      if (profile.platform === platform) {
        return { ...profile, connected: !profile.connected };
      }
      return profile;
    });
    
    setSocialProfiles(updatedProfiles);
    
    const profile = socialProfiles.find(p => p.platform === platform);
    if (profile) {
      toast({
        title: profile.connected ? 
          `Desconectado de ${platform}` : 
          `Conectado com ${platform}`,
        description: profile.connected ? 
          `Sua conta do ${platform} foi desconectada` : 
          `Sua conta do ${platform} foi conectada com sucesso!`,
        variant: profile.connected ? "destructive" : "default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-furia-black">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white p-2 mr-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-furia-white">
              Conectar Redes Sociais
            </h1>
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl">
            Conecte suas redes sociais para aumentar seu nível de engajamento, ganhar pontos e desbloquear benefícios exclusivos como fã da FURIA.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <SocialConnect 
            socialProfiles={socialProfiles}
            onConnectSocial={handleConnectSocial}
          />
        </div>
      </main>
      
      <footer className="bg-furia-darkgray border-t border-furia-gray py-6 mt-12">
        <div className="container text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FURIA Fan Finder | Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Connect;
