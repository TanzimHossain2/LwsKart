"use client";
import { useState, useEffect } from 'react';

export function useCurrentUrl() {
  const [currentPageUrl, setCurrentPageUrl] = useState<string>('');

  useEffect(() => {
    const handleSetUrl = () => {
      if (typeof window !== 'undefined') {
        setCurrentPageUrl(window.location.href);
      }
    };
    handleSetUrl();
  }, []);

  return currentPageUrl;
}