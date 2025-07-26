import '@/components/FigureIcon/index.scss';

import { RefObject } from 'react';

import { FigureSvgNameType } from '@/entities/Figure/Figure';

interface IFigureIconProps {
  className?: string;
  baseClass?: string;
  name: FigureSvgNameType;
  ref?: RefObject<SVGSVGElement | null>;
}

const FigureIcon = ({
  baseClass = 'FigureIcon',
  className = '',
  name,
  ref,
}: IFigureIconProps) => {
  return (
    <svg ref={ref} className={`${baseClass} ${className}`}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default FigureIcon;
