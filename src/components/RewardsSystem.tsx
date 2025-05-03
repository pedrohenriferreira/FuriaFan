
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reward, Contest, PointsTransaction, FanProfile } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Trophy, Gift, Award, Plus, ArrowLeft } from "lucide-react";

interface RewardsSystemProps {
  fanProfile: FanProfile;
  onEarnPoints: (amount: number, source: PointsTransaction['source'], description: string) => void;
  onRedeemReward: (rewardId: string) => void;
}

const RewardsSystem: React.FC<RewardsSystemProps> = ({
  fanProfile,
  onEarnPoints,
  onRedeemReward
}) => {
  const [activeTab, setActiveTab] = useState('rewards');
  const [loadingRedemption, setLoadingRedemption] = useState<string | null>(null);
  const [loadingContest, setLoadingContest] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{visible: boolean, reward?: Reward, contest?: Contest}>({
    visible: false
  });

  // Traduções para níveis
  const tierTranslations = {
    'bronze': 'Bronze',
    'silver': 'Prata',
    'gold': 'Ouro',
    'platinum': 'Platina'
  };

  // Traduções para tipos de recompensas
  const rewardTypeTranslations = {
    'physical': 'Item Físico',
    'digital': 'Item Digital',
    'experience': 'Experiência'
  };
  
  const handleEarnPoints = () => {
    // Simular ganho de pontos a partir de interação social
    onEarnPoints(50, 'social', 'Interação com conteúdo da FURIA');
  };

  const handleRedeemReward = (reward: Reward) => {
    if (fanProfile.totalPoints >= reward.pointsCost) {
      setLoadingRedemption(reward.id);
      
      // Simular tempo de processamento
      setTimeout(() => {
        onRedeemReward(reward.id);
        setLoadingRedemption(null);
        setShowConfirmModal({visible: false});
        
        toast({
          title: "Prêmio resgatado!",
          description: `Você resgatou: ${reward.name}`,
          variant: "default",
        });
      }, 1000);
    } else {
      toast({
        title: "Pontos insuficientes",
        description: `Você precisa de mais ${reward.pointsCost - fanProfile.totalPoints} pontos para resgatar este prêmio.`,
        variant: "destructive",
      });
    }
  };

  const handleJoinContest = (contest: Contest) => {
    const tierLevels = { bronze: 1, silver: 2, gold: 3, platinum: 4 };
    const userTierLevel = tierLevels[fanProfile.fanTier];
    const requiredTierLevel = tierLevels[contest.minLevel as keyof typeof tierLevels];
    
    if (userTierLevel >= requiredTierLevel) {
      setLoadingContest(contest.id);
      
      // Simular tempo de processamento
      setTimeout(() => {
        setLoadingContest(null);
        setShowConfirmModal({visible: false});
        
        toast({
          title: "Inscrição confirmada!",
          description: `Você está participando do sorteio: ${contest.name}`,
          variant: "default",
        });
        
        // Ganhar pontos por participar do sorteio
        onEarnPoints(25, 'engagement', 'Participação em sorteio');
      }, 1000);
    } else {
      toast({
        title: "Nível insuficiente",
        description: `Você precisa ser nível ${tierTranslations[contest.minLevel as keyof typeof tierTranslations]} ou superior para participar deste sorteio.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-furia-gray border-furia-gold/20 relative">
      <CardHeader>
        <CardTitle className="text-furia-white flex items-center gap-2">
          <Trophy size={20} className="text-furia-gold" />
          Sistema de Recompensas
        </CardTitle>
        <CardDescription className="text-gray-400">
          Acumule pontos, resgate prêmios e participe de sorteios exclusivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-furia-darkgray p-4 rounded-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Seus pontos</p>
            <span className="text-2xl font-bold text-furia-gold">
              {fanProfile.totalPoints}
            </span>
          </div>
          <Button 
            onClick={handleEarnPoints} 
            className="bg-furia-gold text-black hover:bg-furia-gold/80 flex items-center gap-1 w-full sm:w-auto animate-pulse-gold"
          >
            <Plus size={16} />
            Ganhar Pontos
          </Button>
        </div>

        <Tabs defaultValue="rewards" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-furia-darkgray w-full mb-6 overflow-x-auto flex-wrap h-auto">
            <TabsTrigger value="rewards" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Prêmios
            </TabsTrigger>
            <TabsTrigger value="contests" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Sorteios
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-4">
            {fanProfile.rewards?.map(reward => (
              <div 
                key={reward.id} 
                className="bg-furia-darkgray rounded-md overflow-hidden flex flex-col sm:flex-row transition-all hover:shadow-md hover:shadow-furia-gold/10"
              >
                {reward.imageUrl && (
                  <div className="w-full h-32 sm:w-24 sm:h-24 bg-furia-gray flex-shrink-0">
                    <img 
                      src={reward.imageUrl} 
                      alt={reward.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4 flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-furia-white font-medium">{reward.name}</h4>
                    <p className="text-xs text-gray-400 mb-1">{reward.description}</p>
                    <Badge className={`bg-furia-darkgray border border-furia-gray text-gray-300`}>
                      {rewardTypeTranslations[reward.type as keyof typeof rewardTypeTranslations]}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                    <span className="text-furia-gold font-bold mb-2">{reward.pointsCost} pontos</span>
                    <Button 
                      onClick={() => setShowConfirmModal({visible: true, reward})}
                      disabled={fanProfile.totalPoints < reward.pointsCost || loadingRedemption === reward.id}
                      className={`
                        ${fanProfile.totalPoints >= reward.pointsCost 
                          ? 'bg-furia-gold text-black hover:bg-furia-gold/80 hover:scale-105 transition-transform' 
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'}
                        w-full sm:w-auto
                      `}
                      size="sm"
                    >
                      {loadingRedemption === reward.id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Resgatando...
                        </span>
                      ) : (
                        <>
                          <Gift size={16} className="mr-1" /> 
                          Resgatar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="contests" className="space-y-4">
            {fanProfile.availableContests?.map(contest => (
              <div 
                key={contest.id} 
                className="bg-furia-darkgray rounded-md overflow-hidden hover:shadow-md hover:shadow-furia-gold/10 transition-all"
              >
                {contest.imageUrl && (
                  <div className="h-32 bg-furia-gray">
                    <img 
                      src={contest.imageUrl} 
                      alt={contest.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h4 className="text-furia-white font-medium">{contest.name}</h4>
                    <Badge className={`
                      ${contest.minLevel === 'bronze' ? 'bg-amber-700' : ''}
                      ${contest.minLevel === 'silver' ? 'bg-gray-400 text-black' : ''}
                      ${contest.minLevel === 'gold' ? 'bg-furia-gold text-black' : ''}
                      ${contest.minLevel === 'platinum' ? 'bg-gray-300 text-black' : ''}
                    `}>
                      Nível {tierTranslations[contest.minLevel as keyof typeof tierTranslations]}+
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{contest.description}</p>
                  <p className="text-xs text-gray-300 mb-1">
                    <span className="text-furia-white">Prêmio:</span> {contest.prize}
                  </p>
                  <p className="text-xs text-gray-300 mb-3">
                    <span className="text-furia-white">Encerra em:</span> {new Date(contest.endDate).toLocaleDateString('pt-BR')}
                  </p>
                  <Button 
                    onClick={() => setShowConfirmModal({visible: true, contest})}
                    disabled={loadingContest === contest.id}
                    className="w-full bg-furia-gold text-black hover:bg-furia-gold/80 hover:scale-[1.02] transition-transform"
                  >
                    {loadingContest === contest.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Inscrevendo...
                      </span>
                    ) : (
                      <>
                        <Award size={16} className="mr-1" /> 
                        Participar do Sorteio
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="history" className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 text-gray-400 hover:text-white"
              onClick={() => setActiveTab('rewards')}
            >
              <ArrowLeft size={16} className="mr-1" />
              Voltar para Prêmios
            </Button>
            
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 mt-8">
              {fanProfile.pointsHistory?.map(transaction => (
                <div 
                  key={transaction.id} 
                  className="bg-furia-darkgray p-3 rounded-md flex flex-col sm:flex-row justify-between gap-2 hover:bg-furia-darkgray/80 transition-colors"
                >
                  <div>
                    <h5 className="text-furia-white text-sm font-medium">
                      {transaction.description}
                    </h5>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                  </div>
                </div>
              ))}
              
              {fanProfile.pointsHistory?.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p>Nenhum histórico de pontos disponível</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de confirmação */}
        {showConfirmModal.visible && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-furia-gray rounded-lg p-6 max-w-sm w-full mx-4 animate-fade-in">
              <h3 className="text-furia-white text-lg font-semibold mb-4">
                {showConfirmModal.reward ? 'Confirmar Resgate' : 'Confirmar Participação'}
              </h3>
              
              {showConfirmModal.reward && (
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    Deseja resgatar {showConfirmModal.reward.name} por {showConfirmModal.reward.pointsCost} pontos?
                  </p>
                  <p className="text-sm text-gray-400">
                    Você possui atualmente {fanProfile.totalPoints} pontos.
                  </p>
                </div>
              )}
              
              {showConfirmModal.contest && (
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    Confirmar participação no sorteio: {showConfirmModal.contest.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Você ganhará 25 pontos por participar deste sorteio!
                  </p>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowConfirmModal({visible: false})}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                
                {showConfirmModal.reward && (
                  <Button 
                    onClick={() => handleRedeemReward(showConfirmModal.reward!)}
                    disabled={loadingRedemption === showConfirmModal.reward.id}
                    className="bg-furia-gold text-black hover:bg-furia-gold/80"
                  >
                    {loadingRedemption === showConfirmModal.reward.id ? 'Processando...' : 'Confirmar Resgate'}
                  </Button>
                )}
                
                {showConfirmModal.contest && (
                  <Button 
                    onClick={() => handleJoinContest(showConfirmModal.contest!)}
                    disabled={loadingContest === showConfirmModal.contest.id}
                    className="bg-furia-gold text-black hover:bg-furia-gold/80"
                  >
                    {loadingContest === showConfirmModal.contest.id ? 'Processando...' : 'Confirmar Participação'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardsSystem;
