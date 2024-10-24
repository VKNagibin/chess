import { EventCallable, StoreWritable } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';

import { CellColor, FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { onCellFocus } from '@/stores/cell';
import { ICellFocusHandler } from '@/stores/cell/types';
import { onGameOver } from '@/stores/events';
import { $currentStepTeam } from '@/stores/team';

import {
  classByHighlightType,
  kingAnimationKeyframes,
  kingAnimationOptions,
} from './data';
import { getHoverClass } from './utils';

interface IProps {
  figureTeam?: FigureTeam;
  animationConfig: IFigureActionAnimationConfig | null;
  hiddenFigure: boolean;
  color: CellColor;
  highlight: HighlightType;
  setCoordinates: (x: number, y: number) => void;
  isOver: boolean;
  figureUnderAttack?: boolean;
}

type StoreData = (
  | EventCallable<void>
  | EventCallable<ICellFocusHandler>
  | StoreWritable<FigureTeam>
)[];

const getStoreData = (highlight: HighlightType, figureTeam?: FigureTeam): StoreData => {
  const values: StoreData = [onCellFocus, onGameOver];
  if (highlight !== HighlightType.NONE || figureTeam) values.push($currentStepTeam);
  return values;
};

export default function useCellLogic({
  figureTeam,
  animationConfig,
  hiddenFigure,
  color,
  highlight,
  isOver,
  figureUnderAttack,
  setCoordinates,
}: IProps) {
  const cellRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<ReactSVG | null>(null);
  const [handleCellFocus, handleGameOver, currentStepTeam = null] = useUnit(
    getStoreData(highlight, figureTeam),
  );

  const hoverClass = getHoverClass({ currentStepTeam, highlight, figureTeam });
  const tabIndex = figureTeam ? 0 : -1;
  const showFigure = !animationConfig && figureTeam && !hiddenFigure;
  const className = `cell ${color} ${classByHighlightType[highlight]} ${hoverClass}`;

  useEffect(() => {
    if (isOver) {
      setTimeout(() => {
        (handleGameOver as EventCallable<void>)();

        alert(
          `Game over! ${
            figureTeam === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK
          } team win!`,
        );
      }, 200);
    }
  }, [isOver]);

  useEffect(() => {
    if (!figureUnderAttack) return;
    iconRef?.current?.reactWrapper?.animate?.(
      kingAnimationKeyframes,
      kingAnimationOptions,
    );
  });

  useEffect(() => {
    if (!cellRef.current) return;
    const {
      height = 0,
      left = 0,
      width = 0,
      top = 0,
    } = cellRef.current.getBoundingClientRect();

    setCoordinates(
      parseInt(String(left - width / 2)),
      parseInt(String(top - height / 2)),
    );
  }, [cellRef.current]);

  return {
    tabIndex,
    currentStepTeam,
    className,
    iconRef,
    cellRef,
    showFigure,
    handleCellFocus,
  };
}
