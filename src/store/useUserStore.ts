import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CosineRegistration, CompanyRegistration, PosterRegistration } from '../lib/schemas';

export type UserType = 'cosine' | 'company' | 'poster' | null;

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  // Auth state
  isLoggedIn: boolean;
  userType: UserType;
  sessionToken: string | null;

  // Profiles
  cosineProfile: any | null; // Detailed structure as per requirements
  companyProfile: any | null;
  posterProfile: any | null;
  
  // App-wide state
  currentRoute: string;
  theme: 'light' | 'dark';
  toastQueue: Toast[];
  postedGigs: any[];

  // Actions
  login: (userData: any, type: UserType) => void;
  logout: () => void;
  updateCosineProfile: (updates: any) => void;
  updateCompanyProfile: (updates: any) => void;
  updatePosterProfile: (updates: any) => void;
  postGig: (gig: any) => void;
  updateGigStatus: (gigId: string, status: any) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentRoute: (route: string) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUserStore = create<AppState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userType: null,
      sessionToken: null,
      cosineProfile: null,
      companyProfile: null,
      posterProfile: null,
      postedGigs: [],
      currentRoute: '/',
      theme: 'dark',
      toastQueue: [],

      login: (userData, type) => set({ 
        isLoggedIn: true,
        userType: type,
        cosineProfile: type === 'cosine' ? userData : null,
        companyProfile: type === 'company' ? userData : null,
        posterProfile: type === 'poster' ? userData : null,
        sessionToken: 'mock-token-' + Math.random()
      }),

      logout: () => set({ 
        isLoggedIn: false,
        userType: null,
        cosineProfile: null,
        companyProfile: null,
        posterProfile: null,
        sessionToken: null
      }),

      updateCosineProfile: (updates) => set((state) => ({
        cosineProfile: state.cosineProfile ? { ...state.cosineProfile, ...updates } : updates
      })),

      updateCompanyProfile: (updates) => set((state) => ({
        companyProfile: state.companyProfile ? { ...state.companyProfile, ...updates } : updates
      })),

      updatePosterProfile: (updates) => set((state) => ({
        posterProfile: state.posterProfile ? { ...state.posterProfile, ...updates } : updates
      })),

      postGig: (gig) => set((state) => ({
        postedGigs: [{ ...gig, id: Math.random().toString(36).substring(7), createdAt: new Date().toISOString() }, ...state.postedGigs]
      })),

      updateGigStatus: (gigId, status) => set((state) => ({
        postedGigs: state.postedGigs.map(g => g.id === gigId ? { ...g, status } : g)
      })),

      setTheme: (theme) => set({ theme }),
      setCurrentRoute: (currentRoute) => set({ currentRoute }),
      
      addToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          toastQueue: [...state.toastQueue, { id, message, type }]
        }));
        setTimeout(() => {
          set((state) => ({
            toastQueue: state.toastQueue.filter((t) => t.id !== id)
          }));
        }, 5000);
      },

      removeToast: (id) => set((state) => ({
        toastQueue: state.toastQueue.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'cos-universal-state',
    }
  )
);
