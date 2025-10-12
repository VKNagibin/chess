import { CSSProperties } from 'react';

import { PositionType } from '../types';

const calculateMenuPosition = (
  position: PositionType,
  parentElement: HTMLDivElement | null,
) => {
  if (!parentElement) return {};
  const rect = parentElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  let top: unknown = rect.bottom + window.scrollY;
  let bottom: unknown = 'auto';

  if (position === 'top' || (position === 'auto' && rect.bottom > viewportHeight / 2)) {
    top = '';
    bottom = viewportHeight - rect.top - window.scrollY;
  }

  return {
    position: 'absolute',
    top: position === 'top' ? 'auto' : top,
    bottom: position === 'top' ? bottom : 'auto',
    left: rect.left + window.scrollX,
    width: rect.width,
    zIndex: 1000,
  } as CSSProperties;
};

export default calculateMenuPosition;
