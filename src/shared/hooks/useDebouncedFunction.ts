import { useCallback, useEffect, useRef } from 'react';

export default function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  dependencies: any[] = [],
): T {
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay, ...dependencies],
  ) as T;

  return debouncedFn;
}
