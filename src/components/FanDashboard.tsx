
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FanProfile } from '@/types';

interface FanDashboardProps {
  fanProfile: FanProfile;
}

const FanDashboard: React.FC<FanDashboardProps> = ({ fanProfile }) => {
  // Calculate connected profiles percentage
  const connectedProfiles = fanProfile.socialProfiles.filter(
    profile => profile.connected
  ).length;
  
  const connectPercentage = Math.round(
    (connectedProfiles / fanProfile.socialProfiles.length) * 100
  );
  
  // Determine next tier
  const tiers = ['bronze', 'silver', 'gold', 'platinum'];
  const currentTierIndex = tiers.indexOf(fanProfile.fanTier);
  const nextTier = currentTierIndex < tiers.length - 1 
    ? tiers[currentTierIndex + 1] 
    : null;
  
  // Points needed for next tier (simplified logic)
  const pointsForNextTier = nextTier ? {
    bronze: 30,
    silver: 60, 
    gold: 90,
    platinum: null
  }[fanProfile.fanTier] : null;
  
  const pointsNeeded = pointsForNextTier ? pointsForNextTier - fanProfile.fanScore : 0;

  return (
    <Card className="bg-furia-gray border-furia-gold/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-furia-white">Dashboard do Fã</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status">
          <TabsList className="bg-furia-darkgray w-full mb-6">
            <TabsTrigger value="status" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Status
            </TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Interesses
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Recomendações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-furia-darkgray p-4 rounded-md">
                <h4 className="text-gray-400 text-sm mb-1">Nível de Fã</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-furia-white capitalize">
                      {fanProfile.fanTier}
                    </span>
                    <div className="h-2 w-full bg-gray-700 rounded-full mt-2">
                      <div 
                        className="h-2 bg-furia-gold rounded-full"
                        style={{ width: `${fanProfile.fanScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl text-furia-gold font-bold">
                      {fanProfile.fanScore}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                  </div>
                </div>
                {nextTier && (
                  <p className="text-xs text-gray-400 mt-2">
                    Mais {pointsNeeded} pontos para nível <span className="capitalize">{nextTier}</span>
                  </p>
                )}
              </div>
              
              <div className="bg-furia-darkgray p-4 rounded-md">
                <h4 className="text-gray-400 text-sm mb-1">Redes Sociais</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-furia-white">
                      {connectedProfiles}/{fanProfile.socialProfiles.length} Conectadas
                    </span>
                    <div className="h-2 w-full bg-gray-700 rounded-full mt-2">
                      <div 
                        className="h-2 bg-furia-gold rounded-full"
                        style={{ width: `${connectPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl text-furia-gold font-bold">
                      {connectPercentage}%
                    </span>
                  </div>
                </div>
                {connectedProfiles < fanProfile.socialProfiles.length && (
                  <p className="text-xs text-gray-400 mt-2">
                    Conecte todas suas redes para aumentar seu Fan Score
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6 bg-furia-darkgray p-4 rounded-md">
              <h4 className="text-gray-400 text-sm mb-3">Resumo de Atividades</h4>
              <div className="space-y-2">
                {Object.entries({
                  'Eventos Participados': fanProfile.engagementMetrics.filter(m => m.type === 'event').length,
                  'Conteúdos Consumidos': fanProfile.engagementMetrics.filter(m => m.type === 'content').reduce((sum, m) => sum + m.value, 0),
                  'Compras Realizadas': fanProfile.engagementMetrics.filter(m => m.type === 'purchase').length,
                  'Interações Sociais': fanProfile.engagementMetrics.filter(m => m.type === 'social').reduce((sum, m) => sum + m.value, 0),
                }).map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-furia-white">{label}</span>
                    <span className="text-furia-gold font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="interests">
            <div className="bg-furia-darkgray p-4 rounded-md">
              <h4 className="text-gray-400 text-sm mb-3">Seus Interesses</h4>
              <div className="flex flex-wrap gap-2">
                {fanProfile.interests.map((interest, idx) => (
                  <Badge key={idx} className="bg-furia-gray text-furia-white hover:bg-furia-gold hover:text-black transition-colors">
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Seus interesses nos ajudam a personalizar sua experiência e sugerir conteúdo relevante
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="bg-furia-darkgray p-4 rounded-md">
              <h4 className="text-gray-400 text-sm mb-3">Recomendado para Você</h4>
              <div className="space-y-3">
                <div className="p-3 border border-furia-gray rounded-md">
                  <h5 className="text-furia-white font-medium">Próximo evento de CS:GO</h5>
                  <p className="text-xs text-gray-400">São Paulo, 15 de junho</p>
                </div>
                <div className="p-3 border border-furia-gray rounded-md">
                  <h5 className="text-furia-white font-medium">Nova coleção de uniformes</h5>
                  <p className="text-xs text-gray-400">Disponível na loja oficial</p>
                </div>
                <div className="p-3 border border-furia-gray rounded-md">
                  <h5 className="text-furia-white font-medium">Conteúdo exclusivo com arT</h5>
                  <p className="text-xs text-gray-400">Vídeo de gameplay com comentários</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Baseado nos seus interesses e atividades
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FanDashboard;
