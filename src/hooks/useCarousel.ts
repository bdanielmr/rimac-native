import { useEffect, useMemo, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView } from "react-native";

interface UseCarouselProps {
  itemCount: number;
  cardWidth: number;
  gap: number;
  isEnabled: boolean;
}

export const useCarousel = ({ itemCount, cardWidth, gap, isEnabled }: UseCarouselProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollElementRef = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isManualScrolling = useRef(false);

  const offsets = useMemo(
    () => Array.from({ length: itemCount }, (_, i) => i * (cardWidth + gap)),
    [itemCount, cardWidth, gap]
  );

  const nearestIndex = (scrollX: number) => {
    let best = 0;
    let bestDist = Infinity;
    
    for (let i = 0; i < offsets.length; i++) {
      const distance = Math.abs(offsets[i] - scrollX);
      if (distance < bestDist) {
        bestDist = distance;
        best = i;
      }
    }
    
    return best;
  };

  // reseteo scroll en la primera posicion
  useEffect(() => {
    if (!isEnabled || isReady || !scrollRef.current || itemCount === 0) return;

    const timer = setTimeout(() => {
      scrollTo(0, false);
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isEnabled, isReady, itemCount]);

  // resetear cuando cambia el estado
  useEffect(() => {
    if (!isEnabled) return;

    setIndex(0);
    setIsReady(false);
    scrollElementRef.current = null;
    isManualScrolling.current = false;
  }, [isEnabled, itemCount]);

  // encontrar elemento scroll
  const findScrollableElement = (element: any, depth = 0): any => {
    if (!element || depth > 10) return null;

    if (element.scrollWidth > element.clientWidth && element.scrollLeft !== undefined) {
      return element;
    }

    if (element.children) {
      for (let i = 0; i < element.children.length; i++) {
        const result = findScrollableElement(element.children[i], depth + 1);
        if (result) return result;
      }
    }

    return null;
  };

  const scrollTo = (x: number, animated = true) => {
    if (!scrollRef.current) return;

    if (Platform.OS === "web") {
      const scrollView = scrollRef.current as any;
      let scrollElement = scrollElementRef.current;

      // buscar elemento si no esta guardado
      if (!scrollElement) {
        const baseElement =
          scrollView._scrollViewRef?.current ||
          scrollView._component ||
          scrollView;

        scrollElement = findScrollableElement(baseElement);

        if (scrollElement) {
          scrollElementRef.current = scrollElement;
        }
      }

      if (scrollElement && scrollElement.scrollLeft !== undefined) {
        if (animated) {
          // web
          const start = scrollElement.scrollLeft;
          const distance = x - start;
          const duration = 300;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            scrollElement.scrollLeft = start + distance * easeOut;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        } else {
          scrollElement.scrollLeft = x;
        }
      }
    } else {
      // native
      (scrollRef.current as any).scrollTo({ x, y: 0, animated });
    }
  };

  const goToIndex = (targetIndex: number) => {
    const clamped = Math.max(0, Math.min(itemCount - 1, targetIndex));
    const targetOffset = offsets[clamped];

    isManualScrolling.current = false;
    setIndex(clamped);
    scrollTo(targetOffset, true);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = nearestIndex(x);
    
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  const handleScrollBeginDrag = () => {
    isManualScrolling.current = true;
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = nearestIndex(x);

    if (newIndex !== index) {
      setIndex(newIndex);
    }

    isManualScrolling.current = false;
  };

  return {
    scrollRef,
    index,
    offsets,
    goToIndex,
    handleScroll,
    handleScrollBeginDrag,
    handleMomentumEnd,
    canGoPrev: index > 0,
    canGoNext: index < itemCount - 1,
    goToPrev: () => goToIndex(index - 1),
    goToNext: () => goToIndex(index + 1),
  };
};
