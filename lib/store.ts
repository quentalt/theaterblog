import { create } from 'zustand';
import { Article } from './types';

interface StoreState {
  articles: Article[];
  favorites: string[];
  user: any | null;
  fetchArticles: () => Promise<void>;
  addArticle: (articleData: Partial<Article>) => Promise<void>;
  toggleFavorite: (articleId: string) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  articles: [],
  favorites: [],
  user: null,
  fetchArticles: async () => {
    try {
      const response = await fetch('/api/articles');
      const articles = await response.json();
      set({ articles });
    } catch (error) {
      console.error('Error fetching plays:', error);
    }
  },
  addArticle: async (articleData) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      const newArticle = await response.json();
      set((state) => ({
        articles: [newArticle, ...state.articles],
      }));
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  },
  toggleFavorite: async (articleId) => {
    const { user } = get();
    if (!user) return;

    try {
      const method = get().favorites.includes(articleId) ? 'DELETE' : 'POST';
      await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, userId: user.id }),
      });

      set((state) => ({
        favorites: state.favorites.includes(articleId)
            ? state.favorites.filter((id) => id !== articleId)
            : [...state.favorites, articleId],
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, favorites: [] }),
}));