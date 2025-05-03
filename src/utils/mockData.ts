
import { FanProfile, User, SocialProfile, EngagementMetric, PlayerDetail, TimeEngagement, SocialUsageStats, InterestCategory, PointsTransaction, Reward, Contest } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Carlos Silva',
  email: 'carlos.silva@example.com',
  avatar: 'https://i.pravatar.cc/150?img=3',
  joinDate: '2022-03-15',
  location: 'São Paulo, Brasil',
  favoriteGame: 'CS2',
  favoritePlayer: 'Fallen',
};

export const mockSocialProfiles: SocialProfile[] = [
  {
    platform: 'twitter',
    username: 'carlosfuria',
    connected: true,
    followers: 1250,
    engagementRate: 3.8,
  },
  {
    platform: 'instagram',
    username: 'carlos.furiafan',
    connected: true,
    followers: 2400,
    engagementRate: 5.2,
  },
  {
    platform: 'twitch',
    username: 'carlosfuriafan',
    connected: false,
  },
  {
    platform: 'discord',
    username: 'CarlosFuria#1234',
    connected: true,
  },
];

export const mockEngagementMetrics: EngagementMetric[] = [
  {
    type: 'event',
    name: 'FURIA Fan Meetup',
    date: '2024-03-10',
    value: 1,
    description: 'Participou do encontro de fãs em São Paulo',
  },
  {
    type: 'content',
    name: 'Highlights de Partidas',
    date: '2024-04-15',
    value: 12,
    description: 'Assistiu a 12 vídeos de destaques de partidas',
  },
  {
    type: 'purchase',
    name: 'Camisa FURIA 2024',
    date: '2024-02-25',
    value: 1,
    description: 'Comprou a camisa oficial do time',
  },
  {
    type: 'social',
    name: 'Engajamento Social',
    date: '2024-04-28',
    value: 45,
    description: 'Interações com conteúdo da FURIA nas redes sociais',
  },
];

export const mockPlayerDetails: PlayerDetail[] = [
  {
    id: '1',
    name: 'Fallen',
    team: 'FURIA',
    game: 'CS2',
    role: 'IGL',
    isFavorite: true
  },
  {
    id: '2',
    name: 'yuurih',
    team: 'FURIA',
    game: 'CS2',
    role: 'Rifler',
    isFavorite: true
  }
];

export const mockTimeEngagements: TimeEngagement[] = [
  {
    timeSlot: 'morning',
    engagementLevel: 30,
    percentage: 20
  },
  {
    timeSlot: 'afternoon',
    engagementLevel: 60,
    percentage: 35
  },
  {
    timeSlot: 'evening',
    engagementLevel: 85,
    percentage: 40
  },
  {
    timeSlot: 'night',
    engagementLevel: 25,
    percentage: 5
  }
];

export const mockSocialUsageStats: SocialUsageStats[] = [
  {
    platform: 'instagram',
    usagePercentage: 65,
    mostFrequentAction: 'visualização de fotos'
  },
  {
    platform: 'twitter',
    usagePercentage: 45,
    mostFrequentAction: 'leitura de notícias'
  },
  {
    platform: 'twitch',
    usagePercentage: 30,
    mostFrequentAction: 'assistir streams'
  },
  {
    platform: 'discord',
    usagePercentage: 20,
    mostFrequentAction: 'participar de discussões'
  }
];

export const mockInterestCategories: InterestCategory[] = [
  {
    category: 'events',
    interestLevel: 80,
    specificInterests: ['Campeonatos de CS2', 'Meet & Greet', 'Viewing Parties']
  },
  {
    category: 'products',
    interestLevel: 60,
    specificInterests: ['Camisas', 'Acessórios', 'Artigos Colecionáveis']
  },
  {
    category: 'news',
    interestLevel: 75,
    specificInterests: ['Resultados de Jogos', 'Transferências', 'Entrevistas']
  },
  {
    category: 'games',
    interestLevel: 90,
    specificInterests: ['CS2', 'Valorant', 'Apex Legends']
  },
  {
    category: 'players',
    interestLevel: 85,
    specificInterests: ['Fallen', 'yuurih', 'KSCERATO']
  }
];

// Novos dados de mock para transações de pontos
export const mockPointsTransactions: PointsTransaction[] = [
  {
    id: '1',
    date: '2024-04-28',
    amount: 150,
    source: 'social',
    description: 'Compartilhou conteúdo da FURIA nas redes sociais'
  },
  {
    id: '2',
    date: '2024-04-25',
    amount: 300,
    source: 'game',
    description: 'Assistiu partida completa de CS2'
  },
  {
    id: '3',
    date: '2024-04-20',
    amount: 500,
    source: 'event',
    description: 'Participação no evento FURIA Fan Day'
  },
  {
    id: '4',
    date: '2024-04-15',
    amount: 200,
    source: 'purchase',
    description: 'Compra na loja oficial'
  },
  {
    id: '5',
    date: '2024-04-10',
    amount: -1000,
    source: 'reward',
    description: 'Resgate de ingresso para próximo evento'
  }
];

// Dados de mock para recompensas
export const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Ingresso VIP para próximo evento',
    description: 'Acesso exclusivo ao próximo evento da FURIA com meet & greet',
    pointsCost: 5000,
    imageUrl: 'https://placehold.co/200x150/gold/black?text=VIP+TICKET',
    available: true,
    type: 'experience'
  },
  {
    id: '2',
    name: 'Camisa oficial autografada',
    description: 'Camisa oficial da FURIA autografada por todo o time de CS2',
    pointsCost: 3500,
    imageUrl: 'https://placehold.co/200x150/furia/white?text=JERSEY',
    available: true,
    type: 'physical'
  },
  {
    id: '3',
    name: 'Adesivos exclusivos',
    description: 'Conjunto de adesivos exclusivos da FURIA',
    pointsCost: 800,
    imageUrl: 'https://placehold.co/200x150/gray/black?text=STICKERS',
    available: true,
    type: 'physical'
  },
  {
    id: '4',
    name: 'Papel de parede exclusivo',
    description: 'Wallpaper digital exclusivo para desktop e celular',
    pointsCost: 200,
    imageUrl: 'https://placehold.co/200x150/black/gold?text=WALLPAPER',
    available: true,
    type: 'digital'
  }
];

// Dados de mock para sorteios
export const mockContests: Contest[] = [
  {
    id: '1',
    name: 'Viagem para o Major 2025',
    description: 'Concorra a uma viagem para assistir ao Major 2025 com a FURIA',
    endDate: '2024-12-31',
    minLevel: 'gold',
    prize: 'Viagem completa + Hospedagem + Ingressos VIP',
    imageUrl: 'https://placehold.co/300x200/gold/black?text=MAJOR+2025'
  },
  {
    id: '2',
    name: 'Dia com os jogadores',
    description: 'Passe um dia conhecendo a rotina dos jogadores da FURIA',
    endDate: '2024-08-15',
    minLevel: 'silver',
    prize: 'Visita ao gaming office + Almoço com os jogadores',
    imageUrl: 'https://placehold.co/300x200/silver/black?text=TEAM+DAY'
  },
  {
    id: '3',
    name: 'Equipamentos gaming',
    description: 'Concorra a um kit completo de equipamentos gaming',
    endDate: '2024-06-30',
    minLevel: 'bronze',
    prize: 'Mouse + Teclado + Headset oficial FURIA',
    imageUrl: 'https://placehold.co/300x200/bronze/black?text=GAMING+GEAR'
  }
];

export const mockFanProfile: FanProfile = {
  user: mockUser,
  socialProfiles: mockSocialProfiles,
  engagementMetrics: mockEngagementMetrics,
  fanScore: 78,
  fanTier: 'gold',
  interests: ['CS2', 'Valorant', 'Produtos', 'Conteúdo de Jogadores Pro'],
  favoriteTeams: ['FURIA', 'NAVI', 'Team Liquid'],
  favoritePlayersDetails: mockPlayerDetails,
  contentInteractionTimes: mockTimeEngagements,
  mostUsedSocialMedia: mockSocialUsageStats,
  interestCategories: mockInterestCategories,
  pointsHistory: mockPointsTransactions,
  totalPoints: 2150,
  rewards: mockRewards,
  availableContests: mockContests
};
