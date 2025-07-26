import '@/components/Cell/index.scss';

import { memo } from 'react';

import AnimationActor from '@/components/Cell/components/AnimationActor';
import useCellLogic from '@/components/Cell/hooks/useCellLogic';
import FigureIcon from '@/components/FigureIcon';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { useAppActions } from '@/store/hooks';

interface IProps {
  cell: ICellAsPlainObject;
}

const Cell = ({ cell }: IProps) => {
  const { clickOnCell } = useAppActions();
  const { cellRef, showFigure, currentTeam, additionalClasses } = useCellLogic(cell);

  return (
    <button
      ref={cellRef}
      onClick={() => {
        clickOnCell({ cellId: cell.id, currentTeam });
      }}
      className={`cell ${additionalClasses}`}
      tabIndex={cell.figure ? 0 : -1}
    >
      {!!showFigure && (
        <FigureIcon className={additionalClasses} name={getFigureSvgName(cell.figure!)} />
      )}
      <AnimationActor
        animationConfig={cell.animationConfig}
        coordinates={cell.coordinates}
      />
    </button>
  );
};

export default memo(Cell);
