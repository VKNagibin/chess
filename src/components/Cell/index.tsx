import './index.scss';

import { memo } from 'react';

import AnimationActor from '@/components/AnimationActor';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import { useAppActions } from '@/redux/hooks';

import useCellLogic from './useCellLogic';
import { getFigureSvgName } from './utils';

interface IProps {
  cell: ICellAsPlainObject;
}

const Cell = ({ cell }: IProps) => {
  const { clickOnCell } = useAppActions();
  const { cellRef, showFigure, currentStepTeam, className } = useCellLogic(cell);

  return (
    <button
      ref={cellRef}
      onClick={() => {
        clickOnCell({ cellId: cell.id, currentStepTeam });
      }}
      className={`cell ${className}`}
      tabIndex={cell.figure ? 0 : -1}
    >
      {!!showFigure && (
        <svg className={`FigureIcon ${className}`}>
          <use href={`/sprite.svg#${getFigureSvgName(cell.figure!)}`} />
        </svg>
      )}
      <AnimationActor
        animationConfig={cell.animationConfig}
        coordinates={cell.coordinates}
      />
    </button>
  );
};

export default memo(Cell);
