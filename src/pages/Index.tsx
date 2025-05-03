
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import SocialConnect from '@/components/SocialConnect';
import EngagementMetrics from '@/components/EngagementMetrics';
import FanDashboard from '@/components/FanDashboard';
import { mockFanProfile } from '@/utils/mockData';
import { SocialProfile, FanProfile, PointsTransaction } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Award } from 'lucide-react';

const Index = () => {
  const [fanProfile, setFanProfile] = useState(mockFanProfile);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleConnectSocial = (platform: SocialProfile['platform']) => {
    // In a real app, this would open an OAuth flow
    // For now, just toggle the connection state
    const updatedProfiles = fanProfile.socialProfiles.map(profile => {
      if (profile.platform === platform) {
        const isConnecting = !profile.connected;
        
        // Add points if connecting a social profile
        if (isConnecting) {
          handleEarnPoints(200, 'social', `Conectou conta do ${platform}`);
        }
        
        return { ...profile, connected: isConnecting };
      }
      return profile;
    });
    
    setFanProfile({
      ...fanProfile,
      socialProfiles: updatedProfiles
    });
    
    const profile = fanProfile.socialProfiles.find(p => p.platform === platform);
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
  
  const handleEarnPoints = (amount: number, source: PointsTransaction['source'], description: string) => {
    const newTransaction: PointsTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount,
      source,
      description
    };
    
    const updatedHistory = [...(fanProfile.pointsHistory || []), newTransaction];
    const updatedPoints = fanProfile.totalPoints + amount;
    
    // Calculate new fan tier based on points
    let newTier = fanProfile.fanTier;
    if (updatedPoints >= 5000) newTier = 'platinum';
    else if (updatedPoints >= 2000) newTier = 'gold';
    else if (updatedPoints >= 500) newTier = 'silver';
    else newTier = 'bronze';
    
    // If tier changed, show toast notification
    if (newTier !== fanProfile.fanTier) {
      toast({
        title: "Novo nível desbloqueado!",
        description: `Parabéns! Você alcançou o nível ${newTier.toUpperCase()}.`,
        variant: "default",
      });
    }
    
    setFanProfile({
      ...fanProfile,
      pointsHistory: updatedHistory,
      totalPoints: updatedPoints,
      fanScore: Math.min(100, Math.floor(updatedPoints / 100)),
      fanTier: newTier
    });
    
    toast({
      title: "Pontos adicionados",
      description: `+${amount} pontos: ${description}`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-furia-black to-furia-darkgray">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-furia-white">
            FURIA <span className="text-furia-gold gold-highlight">Fan Finder</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Conheça seu perfil como fã da FURIA, conecte suas redes sociais e acompanhe seu nível de engajamento para desbloquear recompensas exclusivas.
          </p>
        </div>
        
        {/* Chamada para ação principal */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            className="bg-furia-gold text-black hover:bg-furia-gold/80 px-6 py-6 h-auto text-lg"
            onClick={() => navigate('/profile')}
          >
            <User size={20} className="mr-2" />
            Ver Meu Perfil
          </Button>
          <Button 
            variant="outline"
            className="border-furia-gold text-furia-gold hover:bg-furia-gold hover:text-black px-6 py-6 h-auto text-lg"
            onClick={() => navigate('/connect')}
          >
            <Award size={20} className="mr-2" />
            Ganhar Pontos
          </Button>
        </div>
        
        {isMobile ? (
          // Layout para mobile com abas
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-furia-darkgray w-full">
              <TabsTrigger value="profile" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Perfil
              </TabsTrigger>
              <TabsTrigger value="connect" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Conectar
              </TabsTrigger>
              <TabsTrigger value="engagement" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Atividades
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-8 animate-fade-in">
              <UserProfile 
                user={fanProfile.user} 
                fanScore={fanProfile.fanScore} 
                fanTier={fanProfile.fanTier}
                totalPoints={fanProfile.totalPoints}
              />
              
              <div className="p-4 border border-furia-gold/20 rounded-lg bg-furia-gray">
                <h3 className="text-lg font-medium text-furia-white mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    className="bg-furia-gold text-black hover:bg-furia-gold/80"
                    onClick={() => navigate('/profile')}
                  >
                    Personalizar Perfil
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-furia-gold text-furia-gold hover:bg-furia-gold hover:text-black"
                    onClick={() => handleEarnPoints(50, 'game', 'Check-in diário')}
                  >
                    Check-in Diário
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="connect" className="space-y-8 animate-fade-in">
              <SocialConnect 
                socialProfiles={fanProfile.socialProfiles}
                onConnectSocial={handleConnectSocial}
              />
              
              <Card className="border-furia-gold/20 bg-furia-gray">
                <div className="p-4">
                  <h3 className="text-lg font-medium text-furia-white mb-4">Dica Rápida</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Conecte todas as suas redes sociais para ganhar pontos extras e desbloquear recompensas exclusivas.
                  </p>
                  <div className="flex items-center justify-between bg-furia-darkgray p-3 rounded-lg">
                    <div>
                      <span className="text-furia-gold font-bold text-lg">+200</span>
                      <span className="text-gray-300 text-sm ml-1">pontos</span>
                    </div>
                    <span className="text-xs text-gray-400">por cada rede conectada</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-8 animate-fade-in">
              <FanDashboard fanProfile={fanProfile} />
              <EngagementMetrics metrics={fanProfile.engagementMetrics} />
            </TabsContent>
          </Tabs>
        ) : (
          // Layout para desktop com grid
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="space-y-8 lg:col-span-1">
                <UserProfile 
                  user={fanProfile.user} 
                  fanScore={fanProfile.fanScore} 
                  fanTier={fanProfile.fanTier}
                  totalPoints={fanProfile.totalPoints}
                />
                
                <div className="p-6 bg-furia-gray rounded-lg border border-furia-gold/20">
                  <h3 className="text-xl font-semibold text-furia-white mb-4">Ações Rápidas</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-furia-gold text-black hover:bg-furia-gold/80"
                      onClick={() => navigate('/profile')}
                    >
                      <Settings size={16} className="mr-2" />
                      Personalizar Perfil
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-furia-gold text-furia-gold hover:bg-furia-gold hover:text-black"
                      onClick={() => handleEarnPoints(50, 'game', 'Check-in diário')}
                    >
                      Check-in Diário (+50 pts)
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-furia-gray text-gray-400 hover:text-white"
                      onClick={() => navigate('/metrics')}
                    >
                      Ver Métricas Completas
                    </Button>
                  </div>
                </div>
                
                <SocialConnect 
                  socialProfiles={fanProfile.socialProfiles}
                  onConnectSocial={handleConnectSocial}
                />
              </div>
              
              <div className="space-y-8 lg:col-span-2">
                <div className="p-6 bg-gradient-to-br from-furia-black to-furia-gray rounded-lg border border-furia-gold/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-furia-white">Visão Geral</h3>
                    <Badge className="bg-furia-gold text-black">
                      Nível: {fanProfile.fanTier.charAt(0).toUpperCase() + fanProfile.fanTier.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FanDashboard fanProfile={fanProfile} />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="bg-furia-darkgray p-4 rounded-lg">
                        <h4 className="text-furia-white font-medium mb-2">Próximas Recompensas</h4>
                        <div className="space-y-2">
                          {(fanProfile.rewards || []).slice(0, 2).map((reward) => (
                            <div key={reward.id} className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">{reward.name}</span>
                              <span className="text-furia-gold text-xs">{reward.pointsCost} pts</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-furia-darkgray p-4 rounded-lg">
                        <h4 className="text-furia-white font-medium mb-2">Próximos Eventos</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">CS2: FURIA vs. NAVI</span>
                            <span className="text-furia-gold text-xs">Amanhã</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">Valorant: FURIA vs. Sentinels</span>
                            <span className="text-furia-gold text-xs">3 dias</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-auto bg-furia-gold text-black hover:bg-furia-gold/80"
                        onClick={() => navigate('/connect')}
                      >
                        Explorar Mais Atividades
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <EngagementMetrics metrics={fanProfile.engagementMetrics} />
                  
                  <div className="bg-furia-gray rounded-lg border border-furia-gold/20 p-6">
                    <h3 className="text-xl font-semibold text-furia-white mb-4">Histórico de Pontos</h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {(fanProfile.pointsHistory || []).slice().reverse().map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="bg-furia-darkgray p-3 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="text-white text-sm">{transaction.description}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(transaction.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <span className={`font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                          </span>
                        </div>
                      ))}
                      
                      {(!fanProfile.pointsHistory || fanProfile.pointsHistory.length === 0) && (
                        <p className="text-gray-400 text-center py-4">Nenhum histórico de pontos disponível</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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

export default Index;
