import '@/components/Cell/index.scss';

import { memo } from 'react';

import AnimationActor from '@/components/Cell/components/AnimationActor';
import useCellLogic from '@/components/Cell/useCellLogic';
import FigureIcon from '@/components/FigureIcon';
import { HighlightType } from '@/entities/Cell/enums';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { useAppActions } from '@/store/hooks';

interface IProps {
  cell: ICellAsPlainObject;
}

const rejectedHighlightType = [HighlightType.SELECTED, HighlightType.ENEMY];

const Cell = ({ cell }: IProps) => {
  const { clickOnCell } = useAppActions();
  const { cellRef, showFigure, additionalClasses, withAnimation } = useCellLogic(cell);

  return (
    <button
      data-testid={cell.id}
      ref={cellRef}
      onClick={() => {
        if (rejectedHighlightType.includes(cell.highlight)) return;
        clickOnCell({ cellId: cell.id });
      }}
      className={`cell ${additionalClasses}`}
      tabIndex={cell.figure ? 0 : -1}
    >
      {!!showFigure && (
        <FigureIcon className={additionalClasses} name={getFigureSvgName(cell.figure!)} />
      )}
      {!!withAnimation &&
        cell.animationConfig?.map((config) => (
          <AnimationActor
            key={config.id}
            styles={config.styles}
            animationConfig={config}
            coordinates={cell.coordinates}
          />
        ))}
    </button>
  );
};

export default memo(Cell);
