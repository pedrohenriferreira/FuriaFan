
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import EngagementMetrics from '@/components/EngagementMetrics';
import RewardsSystem from '@/components/RewardsSystem';
import ProfileCustomization from '@/components/ProfileCustomization';
import { mockFanProfile } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/components/ui/use-toast';
import { Award, Settings, ArrowLeft } from 'lucide-react';
import { FanProfile } from '@/types';

const Profile = () => {
  const navigate = useNavigate();
  const [fanProfile, setFanProfile] = useState(mockFanProfile);
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleEarnPoints = (amount: number, source: any, description: string) => {
    const updatedPoints = fanProfile.totalPoints + amount;
    
    // Calculate new fan tier based on points
    let newTier = fanProfile.fanTier;
    if (updatedPoints >= 5000) newTier = 'platinum';
    else if (updatedPoints >= 2000) newTier = 'gold';
    else if (updatedPoints >= 500) newTier = 'silver';
    else newTier = 'bronze';
    
    // Atualizar histórico de pontos
    const newTransaction = {
      id: Date.now().toString(),
      amount: amount,
      date: new Date().toISOString(),
      source: source,
      description: description
    };
    
    setFanProfile({
      ...fanProfile,
      totalPoints: updatedPoints,
      fanScore: Math.min(100, Math.floor(updatedPoints / 100)),
      fanTier: newTier,
      pointsHistory: [newTransaction, ...(fanProfile.pointsHistory || [])]
    });
    
    toast({
      title: "Pontos adicionados",
      description: `+${amount} pontos: ${description}`,
      variant: "default",
    });
  };
  
  const handleRedeemReward = (rewardId: string) => {
    // Encontrar a recompensa pelo ID
    const reward = fanProfile.rewards?.find(r => r.id === rewardId);
    if (!reward) return;
    
    // Deduzir pontos
    const updatedPoints = fanProfile.totalPoints - reward.pointsCost;
    
    // Criar transação
    const newTransaction = {
      id: Date.now().toString(),
      amount: -reward.pointsCost,
      date: new Date().toISOString(),
      source: 'reward',
      description: `Resgatou: ${reward.name}`
    };
    
    setFanProfile({
      ...fanProfile,
      totalPoints: updatedPoints,
      pointsHistory: [newTransaction, ...(fanProfile.pointsHistory || [])]
    });
    
    toast({
      title: "Recompensa resgatada",
      description: `Você resgatou ${reward.name} com sucesso!`,
      variant: "default",
    });
  };
  
  const handleProfileUpdate = (updatedProfile: FanProfile, shouldAwardPoints: boolean = false) => {
    if (shouldAwardPoints) {
      // Só concede pontos quando explicitamente solicitado
      const updatedWithPoints = {
        ...updatedProfile,
        totalPoints: updatedProfile.totalPoints + 50,
      };
      
      // Adiciona a transação ao histórico
      const newTransaction = {
        id: Date.now().toString(),
        amount: 50,
        date: new Date().toISOString(),
        source: 'profile',
        description: 'Atualizou informações de perfil'
      };
      
      setFanProfile({
        ...updatedWithPoints,
        pointsHistory: [newTransaction, ...(updatedProfile.pointsHistory || [])]
      });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas preferências foram salvas com sucesso! (+50 pontos)",
        variant: "default",
      });
    } else {
      // Atualiza o perfil sem conceder pontos
      setFanProfile(updatedProfile);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas preferências foram salvas com sucesso!",
        variant: "default",
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
              Perfil do Fã
            </h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-furia-darkgray w-full mb-6">
              <TabsTrigger value="profile" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Meu Perfil
              </TabsTrigger>
              <TabsTrigger value="customize" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Personalizar
              </TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Engajamento
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
                Recompensas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <UserProfile 
                    user={fanProfile.user} 
                    fanScore={fanProfile.fanScore} 
                    fanTier={fanProfile.fanTier}
                    totalPoints={fanProfile.totalPoints}
                    favoritePlayersDetails={fanProfile.favoritePlayersDetails}
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <div className="p-6 bg-furia-gray rounded-lg border border-furia-gold/20">
                    <h3 className="text-xl font-semibold text-furia-white mb-4">Progresso e Conquistas</h3>
                    
                    <div className="space-y-6">
                      {/* Barra de progresso para próximo nível */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">Progresso para o próximo nível</span>
                          <span className="text-sm text-furia-gold">
                            {fanProfile.fanTier === 'bronze' ? '0/500' : 
                             fanProfile.fanTier === 'silver' ? '500/2000' : 
                             fanProfile.fanTier === 'gold' ? '2000/5000' : '5000+'}
                          </span>
                        </div>
                        <div className="w-full bg-furia-darkgray rounded-full h-2">
                          <div 
                            className="bg-furia-gold rounded-full h-2" 
                            style={{ 
                              width: `${fanProfile.fanTier === 'bronze' 
                                ? (Math.min(fanProfile.totalPoints, 500) / 500) * 100
                                : fanProfile.fanTier === 'silver'
                                ? (Math.min(fanProfile.totalPoints - 500, 1500) / 1500) * 100
                                : fanProfile.fanTier === 'gold'
                                ? (Math.min(fanProfile.totalPoints - 2000, 3000) / 3000) * 100
                                : 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Conquistas desbloqueadas */}
                      <div>
                        <h4 className="text-furia-white mb-2">Conquistas</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-furia-darkgray p-3 rounded-md flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-furia-gold/20 flex items-center justify-center mb-1">
                              <span className="text-furia-gold text-lg">🏆</span>
                            </div>
                            <p className="text-xs text-center text-white">Fã Dedicado</p>
                          </div>
                          <div className="bg-furia-darkgray p-3 rounded-md flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-furia-gold/20 flex items-center justify-center mb-1">
                              <span className="text-furia-gold text-lg">🎮</span>
                            </div>
                            <p className="text-xs text-center text-white">Gamer</p>
                          </div>
                          <div className="bg-furia-darkgray p-3 rounded-md flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-furia-gold/20 flex items-center justify-center mb-1">
                              <span className="text-furia-gold text-lg">📱</span>
                            </div>
                            <p className="text-xs text-center text-white">Social</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full border-furia-gold text-furia-gold hover:bg-furia-gold hover:text-black transition-colors"
                        onClick={() => setActiveTab('customize')}
                      >
                        <Settings size={16} className="mr-2" />
                        Personalizar Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="customize" className="animate-fade-in">
              <ProfileCustomization 
                fanProfile={fanProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            </TabsContent>
            
            <TabsContent value="metrics" className="animate-fade-in relative">
              <Button
                variant="ghost"
                className="absolute top-0 right-0 text-gray-400 hover:text-white mb-4"
                onClick={() => setActiveTab('profile')}
              >
                <ArrowLeft size={16} className="mr-1" />
                Voltar para Perfil
              </Button>
              <div className="py-8">
                <EngagementMetrics metrics={fanProfile.engagementMetrics} />
              </div>
            </TabsContent>
            
            <TabsContent value="rewards" className="animate-fade-in">
              <RewardsSystem 
                fanProfile={fanProfile} 
                onEarnPoints={handleEarnPoints} 
                onRedeemReward={handleRedeemReward}
              />
            </TabsContent>
          </Tabs>
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

export default Profile;
