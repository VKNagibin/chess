import '@/components/FigureIcon/index.scss';

import { RefObject } from 'react';

import { FigureSvgNameType } from '@/entities/Figure/Figure';

interface IFigureIconProps {
  className?: string;
  baseClass?: string;
  name: FigureSvgNameType;
  ref?: RefObject<SVGSVGElement | null> | null;
  styles?: React.CSSProperties;
}

const FigureIcon = ({
  baseClass = 'FigureIcon',
  className = '',
  styles = {},
  name,
  ref,
}: IFigureIconProps) => {
  return (
    <svg ref={ref} style={styles} className={`${baseClass} ${className}`}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default FigureIcon;
