
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; 
import { User, PlayerDetail } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { User as UserIcon, Star } from 'lucide-react';

interface UserProfileProps {
  user: User;
  fanScore: number;
  fanTier: string;
  totalPoints?: number;
  favoritePlayersDetails?: PlayerDetail[];
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  fanScore, 
  fanTier,
  totalPoints,
  favoritePlayersDetails
}) => {
  const isMobile = useIsMobile();

  // Traduções dos níveis
  const tierTranslations = {
    'bronze': 'Bronze',
    'silver': 'Prata',
    'gold': 'Ouro',
    'platinum': 'Platina'
  };
  
  // Paleta de cores para os diferentes níveis
  const tierColors = {
    'bronze': 'bg-amber-700',
    'silver': 'bg-gray-400',
    'gold': 'bg-furia-gold text-black',
    'platinum': 'bg-gray-300 text-black'
  };
  
  // Calcular o progresso percentual para o próximo nível
  const getProgress = () => {
    if (fanTier === 'bronze') return (Math.min(totalPoints || 0, 500) / 500) * 100;
    if (fanTier === 'silver') return (Math.min((totalPoints || 0) - 500, 1500) / 1500) * 100;
    if (fanTier === 'gold') return (Math.min((totalPoints || 0) - 2000, 3000) / 3000) * 100;
    return 100; // platinum
  };

  // Encontrar o jogador favorito
  const favoritePlayer = favoritePlayersDetails?.find(player => player.isFavorite);

  return (
    <Card className="bg-gradient-to-br from-furia-black to-furia-gray border border-furia-gold/20 shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 m-4">
        <Badge 
          className={tierColors[fanTier as keyof typeof tierColors]}
        >
          {tierTranslations[fanTier as keyof typeof tierTranslations]}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-furia-white flex items-center">
          <span>Perfil do Fã</span>
          <span className="ml-auto"></span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className={`flex ${isMobile ? 'flex-col items-center' : 'items-center'} mb-6`}>
          <Avatar className="h-20 w-20 border-2 border-furia-gold ring-2 ring-furia-gold/30">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-furia-darkgray text-furia-gold">
                <UserIcon size={32} />
              </AvatarFallback>
            )}
          </Avatar>
          <div className={`${isMobile ? 'text-center mt-4' : 'ml-4'}`}>
            <h3 className="text-xl font-bold text-furia-white">{user.name}</h3>
            <p className="text-sm text-gray-400">Membro desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}</p>
            
            <div className="mt-3 mb-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">Fan Score</span>
                <span className="text-xs text-furia-gold">{fanScore}/100</span>
              </div>
              <Progress value={fanScore} className="h-1.5" />
            </div>
            
            {totalPoints !== undefined && (
              <p className="text-sm mt-2">
                <span className="text-gray-400">Pontos:</span>
                <span className="ml-1 text-furia-gold font-semibold">{totalPoints}</span>
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6 border-t border-furia-gold/10 pt-4">
          <div>
            <p className="text-gray-400">Localização:</p>
            <p className="text-furia-white">{user.location || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-gray-400">Email:</p>
            <p className="text-furia-white break-all">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Jogo favorito:</p>
            <p className="text-furia-white">{user.favoriteGame || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-gray-400">Jogador favorito:</p>
            {favoritePlayer ? (
              <div className="flex items-center gap-1">
                <Star size={14} className="text-furia-gold" />
                <p className="text-furia-gold font-medium">{favoritePlayer.name}</p>
                <span className="text-xs text-gray-400">({favoritePlayer.team})</span>
              </div>
            ) : (
              <p className="text-furia-white">{user.favoritePlayer || 'Não informado'}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-furia-gold/10">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-400">Próximo nível</span>
            <span className="text-xs text-furia-gold">
              {fanTier === 'bronze' ? '0/500' : 
               fanTier === 'silver' ? '500/2000' : 
               fanTier === 'gold' ? '2000/5000' : '5000+'}
            </span>
          </div>
          <div className="w-full bg-furia-darkgray rounded-full h-2">
            <div 
              className="bg-furia-gold rounded-full h-2 transition-all duration-500" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
