import { useState, useEffect } from 'react';

export const useMaxCards = () => {
  const getMaxCards = () => {
    if (window.innerWidth >= 1440) return 3;
    if (window.innerWidth >= 834) return 2;
    return 1;
  };

  const [maxCards, setMaxCards] = useState(getMaxCards);

  useEffect(() => {
    const handleResize = () => {
      setMaxCards(getMaxCards());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return maxCards;
};
