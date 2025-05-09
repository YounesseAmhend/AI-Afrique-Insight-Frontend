import { create } from 'zustand';

interface NewsState {
  // Filter/Search state
  searchTerm: string;
  selectedCategory: string | null;
  
  // UI state
  isDetailViewOpen: boolean;
  selectedNewsId: number | null;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setIsDetailViewOpen: (isOpen: boolean) => void;
  setSelectedNewsId: (id: number | null) => void;
  
  // Helper functions
  resetFilters: () => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  // Initial state
  searchTerm: '',
  selectedCategory: null,
  isDetailViewOpen: false,
  selectedNewsId: null,
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setIsDetailViewOpen: (isOpen) => set({ isDetailViewOpen: isOpen }),
  setSelectedNewsId: (id) => set({ selectedNewsId: id }),
  
  // Helper functions
  resetFilters: () => set({ 
    searchTerm: '', 
    selectedCategory: null 
  }),
}));

// Selectors
export const useSearchTerm = () => useNewsStore((state) => state.searchTerm);
export const useSelectedCategory = () => useNewsStore((state) => state.selectedCategory);
export const useIsDetailViewOpen = () => useNewsStore((state) => state.isDetailViewOpen);
export const useSelectedNewsId = () => useNewsStore((state) => state.selectedNewsId);