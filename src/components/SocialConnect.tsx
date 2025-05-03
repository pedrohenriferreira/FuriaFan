
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialProfile } from '@/types';
import { Check } from 'lucide-react';

interface SocialConnectProps {
  socialProfiles: SocialProfile[];
  onConnectSocial: (platform: SocialProfile['platform']) => void;
}

const SocialConnect: React.FC<SocialConnectProps> = ({ 
  socialProfiles,
  onConnectSocial
}) => {
  const [activeTab, setActiveTab] = useState<'social'|'activities'>('social');
  
  // Mapear nomes de plataformas para nomes de exibição
  const platformDisplayNames: Record<SocialProfile['platform'], string> = {
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitch: 'Twitch',
    youtube: 'YouTube',
    discord: 'Discord'
  };
  
  // Ícones para as redes sociais
  const platformIcons: Record<SocialProfile['platform'], string> = {
    twitter: '𝕏',
    instagram: '📸',
    facebook: '👥',
    twitch: '🎮',
    youtube: '▶️',
    discord: '💬'
  };
  
  // Calcular o total de redes conectadas
  const connectedCount = socialProfiles.filter(profile => profile.connected).length;
  const totalProfiles = socialProfiles.length;
  const connectPercentage = (connectedCount / totalProfiles) * 100;

  return (
    <Card className="bg-gradient-to-br from-furia-black to-furia-gray border-furia-gold/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-furia-white flex justify-between items-center">
          <span>Conectar Redes</span>
          <span className="text-xs text-furia-gold">
            {connectedCount}/{totalProfiles} conectadas
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full mb-4">
          <TabsList className="bg-furia-darkgray w-full mb-4">
            <TabsTrigger value="social" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Redes Sociais
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Atividades
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="social" className="animate-fade-in">
            {/* Barra de progresso */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Progresso de conexão</span>
                <span className="text-furia-gold">{connectPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-furia-darkgray rounded-full h-2">
                <div 
                  className="bg-furia-gold rounded-full h-2 transition-all duration-500" 
                  style={{ width: `${connectPercentage}%` }}
                ></div>
              </div>
            </div>
        
            <div className="space-y-4">
              {socialProfiles.map((profile) => (
                <div 
                  key={profile.platform} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md bg-furia-darkgray gap-3 hover:bg-furia-darkgray/80 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2" aria-hidden="true">{platformIcons[profile.platform]}</span>
                    <div>
                      <p className="text-furia-white font-medium">
                        {platformDisplayNames[profile.platform]}
                      </p>
                      {profile.connected ? (
                        <div className="text-xs">
                          <span className="text-gray-400">@{profile.username}</span>
                          {profile.followers && (
                            <span className="ml-2 text-furia-gold">
                              {profile.followers.toLocaleString()} seguidores
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400">Não conectado</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={profile.connected ? "outline" : "default"}
                    className={profile.connected 
                      ? "border-furia-gold/50 text-furia-gold hover:bg-furia-darkgray w-full sm:w-auto" 
                      : "bg-furia-gold text-black hover:bg-furia-gold/80 w-full sm:w-auto"
                    }
                    onClick={() => onConnectSocial(profile.platform)}
                  >
                    {profile.connected ? (
                      <>
                        <Check size={16} className="mr-1" /> Conectado
                      </>
                    ) : 'Conectar'}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-furia-darkgray rounded-lg border border-furia-gold/10">
              <p className="text-sm text-center text-gray-300 mb-2">
                Conecte suas redes sociais para ganhar até <span className="text-furia-gold">1200 pontos</span> e desbloquear conteúdos exclusivos!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="animate-fade-in">
            <div className="space-y-4">
              <div className="bg-furia-darkgray p-4 rounded-lg">
                <h4 className="text-furia-white font-medium mb-2">Atividades Diárias</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-200">Check-in diário</p>
                      <p className="text-xs text-gray-400">Faça login todos os dias</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-furia-gold text-black hover:bg-furia-gold/80"
                    >
                      +50 pts
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-200">Assistir stream</p>
                      <p className="text-xs text-gray-400">Veja uma transmissão da FURIA</p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-furia-gold text-black hover:bg-furia-gold/80"
                    >
                      +100 pts
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-furia-darkgray p-4 rounded-lg">
                <h4 className="text-furia-white font-medium mb-2">Desafios Semanais</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-200">Comentar na postagem</p>
                      <p className="text-xs text-gray-400">Comente em 3 postagens da FURIA</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-furia-gold/50 text-furia-gold"
                    >
                      +300 pts
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-200">Compartilhar conteúdo</p>
                      <p className="text-xs text-gray-400">Compartilhe 2 posts da FURIA</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-furia-gold/50 text-furia-gold"
                    >
                      +200 pts
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="w-full bg-furia-gold text-black hover:bg-furia-gold/80">
                  Ver Todos os Desafios
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialConnect;
