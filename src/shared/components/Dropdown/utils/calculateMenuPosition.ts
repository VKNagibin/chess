import { PositionType } from '../types';

const calculateMenuPosition = (parentElement: HTMLDivElement, position: PositionType) => {
  const rect = parentElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  let top = rect.bottom + window.scrollY;
  let bottom = 'auto';

  if (position === 'top' || (position === 'auto' && rect.bottom > viewportHeight / 2)) {
    top = 'auto';
    bottom = viewportHeight - rect.top - window.scrollY;
  }

  return {
    position: 'absolute',
    top: position === 'top' ? 'auto' : top,
    bottom: position === 'top' ? bottom : 'auto',
    left: rect.left + window.scrollX,
    width: rect.width,
    zIndex: 1000,
  };
};

export default calculateMenuPosition;
