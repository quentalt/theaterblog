export interface Article {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: { id: string; name: string }[];
  actors: {
    id: string;
    imageUrl: string;
    name: string;
    bio: string | null;
    role: string;
  }[];
  favorites: {
    id: string;
    createdAt: Date;
    userId: string;
    playId: string;
  }[];
  isFavorited: boolean;
}

