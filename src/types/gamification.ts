export interface LevelInfo {
  level: number;
  xp: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number;
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  description: string;
  earned: boolean;
}
