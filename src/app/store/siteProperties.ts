import { create } from 'zustand';

interface SiteProperties {
  fontFamily: string;
  backgroundColor: string;
  searchbackground: string;
  textColor: string;
  logo: string;
  setProperties: (properties: Partial<SiteProperties>) => void;
}

export const useSiteProperties = create<SiteProperties>((set) => ({
  // Initial values
  fontFamily: 'Poppins',
  backgroundColor: '#299e60',
  searchbackground: '#F3FAF2',
  textColor: '#fff',
  logo: '/logo/logo.png',
  
  // Action to update properties
  setProperties: (properties) => set((state) => ({ ...state, ...properties })),
}));

