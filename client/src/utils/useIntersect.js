import { useEffect, useRef, useState } from "react";
const useIntersect = (options) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);

    const observer = useRef(null);

    const { root, rootMargin, threshold } = options || {};

    useEffect(() => {
      if(elements.length){
          observer.current = new IntersectionObserver(entries => {
            setEntries(entries);
          }, {
              threshold,
              rootMargin,
              root
          });

          elements.forEach(element => {
              observer.current.observe(element);
          });
      }

      return () => {
          if(observer.current){
              observer.current.disconnect();
          }
      }
    }, [elements, root, rootMargin, threshold, observer]);
    
    return [observer.current, setElements, entries];
};

export default useIntersect;