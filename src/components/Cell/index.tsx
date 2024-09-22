import AnimationActor from '_comp/AnimationActor';
import { StyledCell } from '_comp/Cell/styled';
import figuresSvg from '_img/figures';
import { ReactSVG } from 'react-svg';

import CellClass from '@/entities/Cell/Cell';

import useCellLogic from './useCellLogic';
import { getFigureSvgName } from './utils';

interface IProps {
  cell: CellClass;
}

const Cell = ({ cell }: IProps) => {
  const {
    cellRef,
    showFigure,
    iconRef,
    tabIndex,
    handleCellFocus,
    currentStepTeam,
    className,
  } = useCellLogic(cell);

  return (
    <StyledCell
      ref={cellRef}
      onClick={() => handleCellFocus({ cellId: cell.id, currentStepTeam })}
      className={className}
      tabIndex={tabIndex}
    >
      {showFigure ? (
        <ReactSVG
          // @ts-ignore
          ref={iconRef}
          className={`figureIconContainer ${className}`}
          src={figuresSvg[getFigureSvgName(cell.figure!)]}
        />
      ) : null}
      {!!cell.animationConfig && (
        <AnimationActor
          className={className}
          animationConfig={cell.animationConfig}
          coordinates={cell.coordinates}
        />
      )}
    </StyledCell>
  );
};

export default Cell;
