import { useState, useEffect } from 'react';

// Module-level cache to share loaded content across all components and mount cycles.
let cachedContent: any = null;
let promise: Promise<any> | null = null;

export function useContent() {
  const [content, setContent] = useState<any>(cachedContent);
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    if (cachedContent) {
      setLoading(false);
      return;
    }

    if (!promise) {
      promise = fetch(`/assets/content.json?v=${Date.now()}`, { cache: 'no-cache' })
        .then((r) => (r.ok ? r.json() : {}))
        .then((data) => {
          cachedContent = data;
          return data;
        })
        .catch(() => {
          cachedContent = {};
          return {};
        });
    }

    let active = true;
    promise.then((data) => {
      if (active) {
        setContent(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Helper function to get a content value with fallback
  const get = (section: string, key: string, fallback: string): string => {
    if (content && content[section] && content[section][key] !== undefined && content[section][key] !== '') {
      return content[section][key];
    }
    return fallback;
  };

  // Helper function to get a numeric value with fallback
  const getNum = (section: string, key: string, fallback: number): number => {
    if (content && content[section] && content[section][key] !== undefined && content[section][key] !== '') {
      const parsed = Number(content[section][key]);
      return isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  };

  return { content, loading, get, getNum };
}
