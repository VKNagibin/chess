import AnimationActor from '_comp/AnimationActor';
import { StyledCell } from '_comp/Cell/styled';
import figuresSvg from '_img/figures';
import { EventCallable } from 'effector';
import { memo } from 'react';
import { ReactSVG } from 'react-svg';

import { CellColor, FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import { CellIdType, IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { ICellFocusHandler } from '@/stores/cell/types';

import useCellLogic from './useCellLogic';
import { getFigureSvgName } from './utils';

interface IProps {
  id: CellIdType;
  animationConfig: IFigureActionAnimationConfig | null;
  hiddenFigure: boolean;
  color: CellColor;
  highlight: HighlightType;
  isOver: boolean;
  setCoordinates: (x: number, y: number) => void;
  x: number;
  y: number;
  figureTeam?: FigureTeam;
  figureType?: FigureType;
  figureUnderAttack?: boolean;
}

const Cell = (props: IProps) => {
  const { id, animationConfig, figureTeam, figureType, x, y } = props;

  const {
    cellRef,
    currentStepTeam,
    showFigure,
    iconRef,
    tabIndex,
    handleCellFocus,
    className,
  } = useCellLogic(props);

  return (
    <StyledCell
      ref={cellRef}
      onClick={() => {
        if (!currentStepTeam) return;
        (handleCellFocus as EventCallable<ICellFocusHandler>)({
          cellId: id,
          currentStepTeam,
        });
      }}
      className={className}
      tabIndex={tabIndex}
    >
      {showFigure ? (
        <ReactSVG
          // @ts-ignore
          ref={iconRef}
          className={`figureIconContainer ${className}`}
          src={figuresSvg[getFigureSvgName({ team: figureTeam!, type: figureType! })]}
        />
      ) : null}
      {!!animationConfig && (
        <AnimationActor
          className={className}
          animationConfig={animationConfig}
          coordinates={[x, y]}
        />
      )}
    </StyledCell>
  );
};

export default memo(Cell);
