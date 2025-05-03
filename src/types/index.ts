
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  location?: string;
  favoriteGame?: string;
  favoritePlayer?: string;
}

export interface SocialProfile {
  platform: 'twitter' | 'instagram' | 'facebook' | 'twitch' | 'youtube' | 'discord';
  username: string;
  connected: boolean;
  followers?: number;
  engagementRate?: number;
}

export interface EngagementMetric {
  type: 'event' | 'content' | 'purchase' | 'social';
  name: string;
  date: string;
  value: number;
  description?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl?: string;
  available: boolean;
  type: 'physical' | 'digital' | 'experience';
}

export interface Contest {
  id: string;
  name: string;
  description: string;
  endDate: string;
  minLevel: string; // 'bronze' | 'silver' | 'gold' | 'platinum'
  prize: string;
  imageUrl?: string;
}

export interface PointsTransaction {
  id: string;
  date: string;
  amount: number;
  source: 'social' | 'game' | 'purchase' | 'reward' | 'event';
  description: string;
}

export interface FanProfile {
  user: User;
  socialProfiles: SocialProfile[];
  engagementMetrics: EngagementMetric[];
  fanScore: number;
  fanTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  interests: string[];
  favoriteTeams?: string[];
  favoritePlayersDetails?: PlayerDetail[];
  contentInteractionTimes?: TimeEngagement[];
  mostUsedSocialMedia?: SocialUsageStats[];
  interestCategories?: InterestCategory[];
  pointsHistory?: PointsTransaction[];
  totalPoints: number;
  rewards?: Reward[];
  availableContests?: Contest[];
}

export interface PlayerDetail {
  id: string;
  name: string;
  team: string;
  game: string;
  role?: string;
  isFavorite: boolean;
}

export interface TimeEngagement {
  timeSlot: string; // e.g. "morning", "afternoon", "evening", "night"
  engagementLevel: number; // 0-100
  percentage: number;
}

export interface SocialUsageStats {
  platform: SocialProfile['platform'];
  usagePercentage: number;
  mostFrequentAction: string;
}

export interface InterestCategory {
  category: 'events' | 'products' | 'news' | 'games' | 'players';
  interestLevel: number; // 0-100
  specificInterests: string[];
}
