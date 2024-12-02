export enum CommunityCategory {
  HISTORY = "HISTORY",
  FOOD = "FOOD",
  PETS = "PETS",
  HEALTH = "HEALTH",
  FASHION = "FASHION",
  EXERCISE = "EXERCISE",
  OTHERS = "OTHERS",
}
export interface Post {
  id: number;
  title: string;
  content: string;
  category: CommunityCategory;
  author: {
    id: number;
    username: string;
  };
  authorId: number;
  comments: Comment[];
  _count?: {
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name?: string;
    username?: string;
  };
  createdAt: string;
}
