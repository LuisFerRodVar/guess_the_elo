export interface ChessGame {
  id: string;
  rated: boolean;
  variant: string;
  speed: string;
  perf: string;
  createdAt: number;
  lastMoveAt: number;
  status: string;
  players: {
    white: Player;
    black: Player;
  };
  opening: {
    eco: string;
    name: string;
    ply: number;
  };
  moves: string;
  clock: {
    initial: number;
    increment: number;
    totalTime: number;
  };
  analysis?: MoveAnalysis[];
  clocks?: number[];
}

interface Player {
  user?: {
    name: string;
    id: string;
  };
  rating?: number;
  ratingDiff?: number;
  analysis?: PlayerAnalysis;
}

interface PlayerAnalysis {
  inaccuracy: number;
  mistake: number;
  blunder: number;
  acpl: number; // Average centipawn loss
}

interface MoveAnalysis {
  eval: number;
  best?: string;
  variation?: string;
  judgment?: {
    name: string;
    comment: string;
  };
}

