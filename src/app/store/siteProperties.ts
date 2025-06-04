import { create } from 'zustand';

interface SiteProperties {
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
  logo: string;
  setProperties: (properties: Partial<SiteProperties>) => void;
}

export const useSiteProperties = create<SiteProperties>((set) => ({
  // Initial values
  fontFamily: 'Poppins',
  backgroundColor: '#155dfc',
  textColor: '#fff',
  logo: '/logo/logo.jpg',
  
  // Action to update properties
  setProperties: (properties) => set((state) => ({ ...state, ...properties })),
}));

