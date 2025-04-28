'use client';
import { useEffect } from 'react';
import { useSiteProperties } from '@/app/store/siteProperties';
import { GET_SITE_PROPERTIES } from '@/app/lib/api/siteProperties';

export function SitePropertiesProvider({ children }: { children: React.ReactNode }) {
  const setProperties = useSiteProperties((state) => state.setProperties);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await GET_SITE_PROPERTIES();
        setProperties(properties);
      } catch (error) {
        console.error('Error fetching site properties:', error);
      }
    };

    fetchProperties();
  }, [setProperties]);

  return children;
}
