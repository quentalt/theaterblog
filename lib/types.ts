export interface Actor {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actors: Actor[];
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
}