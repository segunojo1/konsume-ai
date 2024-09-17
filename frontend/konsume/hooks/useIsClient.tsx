import { useState, useEffect } from 'react';

// Custom hook to check if we're on the client side
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // After the initial render, set isClient to true
  }, []);

  return isClient;
};

export default useIsClient;
