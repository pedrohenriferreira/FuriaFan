
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlusIcon, XIcon, Star, StarOff } from "lucide-react";
import { FanProfile, PlayerDetail, InterestCategory } from '@/types';

interface ProfileCustomizationProps {
  fanProfile: FanProfile;
  onProfileUpdate: (updatedProfile: FanProfile) => void;
}

const ProfileCustomization: React.FC<ProfileCustomizationProps> = ({ fanProfile, onProfileUpdate }) => {
  // State for teams input
  const [newTeam, setNewTeam] = useState('');
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(fanProfile.favoriteTeams || []);
  
  // State for players
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    team: '',
    game: '',
    role: ''
  });
  const [favoritePlayers, setFavoritePlayers] = useState<PlayerDetail[]>(
    fanProfile.favoritePlayersDetails || []
  );
  
  // State for interests
  const [newInterest, setNewInterest] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InterestCategory['category']>('events');
  const [interestCategories, setInterestCategories] = useState<InterestCategory[]>(
    fanProfile.interestCategories || [
      { category: 'events', interestLevel: 50, specificInterests: [] },
      { category: 'products', interestLevel: 50, specificInterests: [] },
      { category: 'news', interestLevel: 50, specificInterests: [] },
      { category: 'games', interestLevel: 50, specificInterests: [] },
      { category: 'players', interestLevel: 50, specificInterests: [] }
    ]
  );
  
  // State for social media preferences
  const [socialPreferences, setSocialPreferences] = useState(
    fanProfile.mostUsedSocialMedia || fanProfile.socialProfiles.map(profile => ({
      platform: profile.platform,
      usagePercentage: profile.connected ? 20 : 0,
      mostFrequentAction: 'visualização'
    }))
  );

  // Handle team addition
  const addTeam = () => {
    if (newTeam.trim() && !favoriteTeams.includes(newTeam.trim())) {
      const updatedTeams = [...favoriteTeams, newTeam.trim()];
      setFavoriteTeams(updatedTeams);
      setNewTeam('');
      
      // Update the fan profile with points award
      const updatedProfile = {
        ...fanProfile,
        favoriteTeams: updatedTeams
      };
      // Ganho de pontos apenas quando adiciona um novo time (ação positiva)
      onProfileUpdate(updatedProfile, true);
    }
  };
  
  // Handle team removal
  const removeTeam = (team: string) => {
    const updatedTeams = favoriteTeams.filter(t => t !== team);
    setFavoriteTeams(updatedTeams);
    
    // Update the fan profile without points award
    const updatedProfile = {
      ...fanProfile,
      favoriteTeams: updatedTeams
    };
    // Sem ganho de pontos ao remover um time
    onProfileUpdate(updatedProfile, false);
  };
  
  // Handle player addition
  const addPlayer = () => {
    if (newPlayer.name.trim() && newPlayer.game.trim()) {
      const playerToAdd: PlayerDetail = {
        id: Date.now().toString(),
        name: newPlayer.name.trim(),
        team: newPlayer.team.trim(),
        game: newPlayer.game.trim(),
        role: newPlayer.role.trim() || undefined,
        isFavorite: favoritePlayers.length === 0 // Primeiro jogador adicionado será automaticamente favorito
      };
      
      const updatedPlayers = [...favoritePlayers, playerToAdd];
      setFavoritePlayers(updatedPlayers);
      setNewPlayer({
        name: '',
        team: '',
        game: '',
        role: ''
      });
      
      // Update the fan profile
      const updatedProfile = {
        ...fanProfile,
        favoritePlayersDetails: updatedPlayers
      };
      // Ganho de pontos ao adicionar jogador (ação positiva)
      onProfileUpdate(updatedProfile, true);
    }
  };
  
  // Handle player removal
  const removePlayer = (playerId: string) => {
    const updatedPlayers = favoritePlayers.filter(player => player.id !== playerId);
    setFavoritePlayers(updatedPlayers);
    
    // Update the fan profile
    const updatedProfile = {
      ...fanProfile,
      favoritePlayersDetails: updatedPlayers
    };
    // Sem ganho de pontos ao remover um jogador
    onProfileUpdate(updatedProfile, false);
  };
  
  // Toggle player as favorite
  const toggleFavoritePlayer = (playerId: string) => {
    const updatedPlayers = favoritePlayers.map(player => {
      if (player.id === playerId) {
        return { ...player, isFavorite: true };
      }
      return { ...player, isFavorite: false };
    });
    
    setFavoritePlayers(updatedPlayers);
    
    // Update the fan profile
    const updatedProfile = {
      ...fanProfile,
      favoritePlayersDetails: updatedPlayers
    };
    // Atualiza o perfil sem ganho de pontos (apenas uma preferência)
    onProfileUpdate(updatedProfile, false);
  };
  
  // Handle interest addition
  const addInterest = () => {
    if (newInterest.trim()) {
      const updatedCategories = interestCategories.map(category => {
        if (category.category === selectedCategory) {
          return {
            ...category,
            specificInterests: [...category.specificInterests, newInterest.trim()]
          };
        }
        return category;
      });
      
      setInterestCategories(updatedCategories);
      setNewInterest('');
      
      // Update the fan profile
      const updatedProfile = {
        ...fanProfile,
        interestCategories: updatedCategories
      };
      // Ganho de pontos ao adicionar interesse (ação positiva)
      onProfileUpdate(updatedProfile, true);
    }
  };
  
  // Handle interest removal
  const removeInterest = (categoryType: InterestCategory['category'], interestToRemove: string) => {
    const updatedCategories = interestCategories.map(category => {
      if (category.category === categoryType) {
        return {
          ...category,
          specificInterests: category.specificInterests.filter(
            interest => interest !== interestToRemove
          )
        };
      }
      return category;
    });
    
    setInterestCategories(updatedCategories);
    
    // Update the fan profile
    const updatedProfile = {
      ...fanProfile,
      interestCategories: updatedCategories
    };
    // Sem ganho de pontos ao remover um interesse
    onProfileUpdate(updatedProfile, false);
  };
  
  // Handle interest level change
  const updateInterestLevel = (categoryType: InterestCategory['category'], level: number) => {
    const updatedCategories = interestCategories.map(category => {
      if (category.category === categoryType) {
        return { ...category, interestLevel: level };
      }
      return category;
    });
    
    setInterestCategories(updatedCategories);
    
    // Update the fan profile
    const updatedProfile = {
      ...fanProfile,
      interestCategories: updatedCategories
    };
    // Sem ganho de pontos ao ajustar nível de interesse (apenas uma preferência)
    onProfileUpdate(updatedProfile, false);
  };
  
  // Handle social media preference update
  const updateSocialPreference = (platform: string, value: number) => {
    const updatedPreferences = socialPreferences.map(pref => {
      if (pref.platform === platform) {
        return { ...pref, usagePercentage: value };
      }
      return pref;
    });
    
    setSocialPreferences(updatedPreferences);
    
    // Update the fan profile
    const updatedProfile = {
      ...fanProfile,
      mostUsedSocialMedia: updatedPreferences
    };
    // Sem ganho de pontos ao ajustar preferências de redes sociais (apenas uma preferência)
    onProfileUpdate(updatedProfile, false);
  };

  // Get category display name
  const getCategoryDisplayName = (category: InterestCategory['category']) => {
    const names = {
      events: 'Eventos',
      products: 'Produtos',
      news: 'Notícias',
      games: 'Jogos',
      players: 'Jogadores'
    };
    return names[category];
  };
  
  // Get platform display name
  const getPlatformDisplayName = (platform: string) => {
    const names: Record<string, string> = {
      twitter: 'Twitter',
      instagram: 'Instagram',
      facebook: 'Facebook',
      twitch: 'Twitch',
      youtube: 'YouTube',
      discord: 'Discord'
    };
    return names[platform] || platform;
  };

  return (
    <Card className="bg-furia-gray border-furia-gold/20">
      <CardHeader>
        <CardTitle className="text-furia-white">Personalizar Perfil</CardTitle>
        <CardDescription className="text-gray-400">
          Ajuste suas preferências para melhorar sua experiência como fã da FURIA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="teams">
          <TabsList className="bg-furia-darkgray w-full mb-6">
            <TabsTrigger value="teams" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Times
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Jogadores
            </TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Interesses
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-furia-gold data-[state=active]:text-black">
              Redes Sociais
            </TabsTrigger>
          </TabsList>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  className="bg-furia-darkgray border-furia-gray text-white"
                  placeholder="Digite um time favorito" 
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  className="border-furia-gold text-furia-gold"
                  onClick={addTeam}
                >
                  <PlusIcon size={16} />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {favoriteTeams.map((team, index) => (
                  <Badge 
                    key={index} 
                    className="bg-furia-darkgray text-white px-3 py-1 flex items-center gap-1"
                  >
                    {team}
                    <XIcon 
                      size={14} 
                      className="cursor-pointer text-gray-400 hover:text-white"
                      onClick={() => removeTeam(team)} 
                    />
                  </Badge>
                ))}
                {favoriteTeams.length === 0 && (
                  <p className="text-sm text-gray-400">Nenhum time adicionado ainda</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  className="bg-furia-darkgray border-furia-gray text-white"
                  placeholder="Nome do jogador" 
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                />
                <Input 
                  className="bg-furia-darkgray border-furia-gray text-white"
                  placeholder="Time" 
                  value={newPlayer.team}
                  onChange={(e) => setNewPlayer({...newPlayer, team: e.target.value})}
                />
                <Input 
                  className="bg-furia-darkgray border-furia-gray text-white"
                  placeholder="Jogo" 
                  value={newPlayer.game}
                  onChange={(e) => setNewPlayer({...newPlayer, game: e.target.value})}
                />
                <Input 
                  className="bg-furia-darkgray border-furia-gray text-white"
                  placeholder="Função" 
                  value={newPlayer.role || ''}
                  onChange={(e) => setNewPlayer({...newPlayer, role: e.target.value})}
                />
              </div>
              
              <Button 
                className="w-full bg-furia-gold text-black hover:bg-furia-gold/80"
                onClick={addPlayer}
              >
                Adicionar Jogador
              </Button>
              
              <div className="mt-4 space-y-2">
                {favoritePlayers.map(player => (
                  <div key={player.id} className="bg-furia-darkgray p-3 rounded-md flex justify-between items-center">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{player.name}</p>
                        {player.isFavorite && (
                          <Badge className="bg-furia-gold text-black text-xs">Favorito</Badge>
                        )}
                      </div>
                      <div className="flex text-xs text-gray-400">
                        <span>{player.team}</span>
                        <span className="mx-1">•</span>
                        <span>{player.game}</span>
                        {player.role && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{player.role}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`text-${player.isFavorite ? 'furia-gold' : 'gray-400'} hover:text-furia-gold hover:bg-transparent`}
                        onClick={() => toggleFavoritePlayer(player.id)}
                        title={player.isFavorite ? "Jogador favorito" : "Marcar como favorito"}
                      >
                        {player.isFavorite ? <Star size={16} /> : <StarOff size={16} />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-transparent"
                        onClick={() => removePlayer(player.id)}
                      >
                        <XIcon size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                {favoritePlayers.length === 0 && (
                  <p className="text-sm text-gray-400">Nenhum jogador adicionado ainda</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent value="interests">
            <div className="space-y-4">
              <Select defaultValue={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                <SelectTrigger className="bg-furia-darkgray border-furia-gray text-white">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-furia-darkgray border-furia-gray text-white">
                  {interestCategories.map(category => (
                    <SelectItem key={category.category} value={category.category}>
                      {getCategoryDisplayName(category.category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {interestCategories.map(category => (
                category.category === selectedCategory && (
                  <div key={category.category} className="space-y-4">
                    <div>
                      <p className="text-white mb-2">Nível de interesse em {getCategoryDisplayName(category.category)}</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={category.interestLevel}
                          onChange={(e) => updateInterestLevel(category.category, parseInt(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-furia-gold font-medium">{category.interestLevel}%</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        className="bg-furia-darkgray border-furia-gray text-white"
                        placeholder={`Adicionar interesse em ${getCategoryDisplayName(category.category)}`}
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="border-furia-gold text-furia-gold"
                        onClick={addInterest}
                      >
                        <PlusIcon size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.specificInterests.map((interest, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-furia-darkgray text-white px-3 py-1 flex items-center gap-1"
                        >
                          {interest}
                          <XIcon 
                            size={14} 
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => removeInterest(category.category, interest)} 
                          />
                        </Badge>
                      ))}
                      {category.specificInterests.length === 0 && (
                        <p className="text-sm text-gray-400">Nenhum interesse específico adicionado</p>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <div className="space-y-4">
              <p className="text-white mb-2">Com que frequência você usa cada rede social?</p>
              
              {socialPreferences.map((social) => (
                <div key={social.platform} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-white">{getPlatformDisplayName(social.platform)}</p>
                    <span className="text-furia-gold font-medium">{social.usagePercentage}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={social.usagePercentage}
                    onChange={(e) => updateSocialPreference(social.platform, parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
              
              <div className="bg-furia-darkgray p-3 rounded-md mt-6">
                <p className="text-white font-medium mb-2">Horários de maior interação</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Manhã', 'Tarde', 'Noite', 'Madrugada'].map((time, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`time-${idx}`} 
                        className="text-furia-gold rounded"
                      />
                      <label htmlFor={`time-${idx}`} className="text-gray-300">{time}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileCustomization;
