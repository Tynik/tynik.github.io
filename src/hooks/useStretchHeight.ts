import { useEffect, useRef } from 'react';

export const useStretchHeight = <T extends HTMLElement>() => {
  const contentRef = useRef<T>(null);

  useEffect(() => {
    const setContentHeight = () => {
      if (contentRef.current) {
        contentRef.current.style.height = `${
          document.documentElement.clientHeight - contentRef.current.getBoundingClientRect().top
        }px`;
      }
    };

    setContentHeight();

    window.addEventListener('resize', setContentHeight);
    return () => {
      window.removeEventListener('resize', setContentHeight);
    };
  }, [contentRef]);

  return contentRef;
};
