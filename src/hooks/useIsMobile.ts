import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkTablet();

    window.addEventListener('resize', checkTablet);

    return () => {
      window.removeEventListener('resize', checkTablet);
    };
  }, []);

  return { isMobile };
};
