import { useState, useRef, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (initialPage = 1) => {
  const [page, setPage] = useState<number>(initialPage);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage(prev => {
      const nextPage = Number.isNaN(prev) ? initialPage : prev + 1;
      return Math.max(1, nextPage); 
    });
  }, [isLoading, hasMore, initialPage]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore, hasMore]);

  const appendItems = useCallback((newItems: any[], itemsLimit: number) => {
    if (!Array.isArray(newItems)) return;
    
    setAllItems(prev => [...prev, ...newItems]);
    setHasMore(newItems.length >= itemsLimit);
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setAllItems([]);
    setHasMore(true);
  }, [initialPage]);

  return {
    page,
    allItems,
    observerRef,
    isLoading,
    hasMore,
    appendItems,
    loadMore,
    reset,
    setIsLoading
  };
};