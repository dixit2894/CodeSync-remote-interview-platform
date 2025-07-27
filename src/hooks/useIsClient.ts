import { useEffect, useState } from "react";

/**
 * Custom hook to prevent hydration mismatches by ensuring components
 * only render client-side specific content after mounting
 */
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
