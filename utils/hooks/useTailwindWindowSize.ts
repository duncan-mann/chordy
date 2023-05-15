import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

type TailWindSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const getWindowSize = (innerWidth: number): TailWindSize => {
  if (innerWidth < 640) {
    return 'sm'
  } else if (innerWidth < 768) {
    return'md'
  } else if (innerWidth < 1024) {
    return 'lg'
  } else if (innerWidth < 1280) {
   return  'xl'
  } else {
    return '2xl'
  }
}

export const useTailwindWindowSize = () => {
  const { innerWidth } = window;
  const [size, setSize] = useState<TailWindSize>(getWindowSize(innerWidth));

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize(getWindowSize(innerWidth))
    }, 100);

    window.addEventListener('resize', handleResize);

    // cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};


