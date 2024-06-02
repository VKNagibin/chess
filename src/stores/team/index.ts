import { createStore } from 'effector';

import { FigureTeam } from '@/entities/Cell/enums';
import { changeTeam, onGameOver } from '@/stores/events';

export const $currentStepTeam = createStore<FigureTeam>(FigureTeam.WHITE);

$currentStepTeam.on(changeTeam, (currentStepTeam) =>
  currentStepTeam === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK,
);

$currentStepTeam.on(onGameOver, () => FigureTeam.WHITE);
