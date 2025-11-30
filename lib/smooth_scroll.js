import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext();
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
        smoothTouch: true,
        smoothWheel: true,
        smooth: true,
        wheelMultiplier: 1,
    });

    let rafId;
    const raf = (time) => {
      lenisRef.current.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
