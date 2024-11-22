export interface Game {
  title: string;
  rank: number;
  platform: string;
  imageUrl: string;
  websiteUrl: string;
  description: string;
}

export interface GamesByMonth {
  year: number;
  month: string;
  games: Game[];
}
