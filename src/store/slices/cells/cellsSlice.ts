import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { AnimationActionType, CellIdType, ICell } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { findById } from '@/shared/utils/findById';
import { uniqId } from '@/shared/utils/uniqId';
import createCustomSlice from '@/store/createCustomSlice';
import { ConfigItemType, teamsConfigs } from '@/store/slices/cells/placesConfig';
import { DifficultyLevel, IStep } from '@/store/slices/cells/types';
import arrangeCells from '@/store/slices/cells/utils/arrangeCells';
import getAfterStepBoardState from '@/store/slices/cells/utils/getAfterStepBoardState';
import handleFigureSelect from '@/store/slices/cells/utils/handleFigureSelect';
import {
  calculateFiftyStepsRuleCount,
  checkIsStep,
  getEnemyTeam,
  getSteps,
  resetCellsHighlight,
} from '@/store/slices/cells/utils/helpers';
import makeFEN from '@/store/slices/cells/utils/makeFEN';

export interface IGameEngineState {
  cells: ICell[];
  nextMove: string | null;
  FEN: string | null;
  fullmoveNumber: number;
  fiftyStepsRuleCount: number;
  loading: boolean;
  canStartGame: boolean;
  canChangeTeam: boolean;
  errorMessage: boolean;
  userTeam: FigureTeam;
  activeTeam: FigureTeam;
  deadKingTeam: FigureTeam | null;
  cellWithMutablePawnId: CellIdType | null;
  difficultyLevel: DifficultyLevel;
}

const initialCells = arrangeCells(teamsConfigs);
const initialActiveTeam = FigureTeam.WHITE;
const initialFiftyStepsRuleCount = 0;
const initialFullmoveNumber = 1;

const initialState: IGameEngineState = {
  canStartGame: false,
  cells: initialCells,
  nextMove: null,
  loading: false,
  errorMessage: false,
  userTeam: FigureTeam.WHITE,
  activeTeam: initialActiveTeam,
  canChangeTeam: false,
  deadKingTeam: null,
  cellWithMutablePawnId: null,
  FEN: makeFEN({
    cells: initialCells,
    activeTeam: initialActiveTeam,
    fiftyStepsRuleCount: initialFiftyStepsRuleCount,
    fullmoveNumber: initialFullmoveNumber,
  }),
  fullmoveNumber: initialFullmoveNumber,
  fiftyStepsRuleCount: initialFiftyStepsRuleCount,
  difficultyLevel: DifficultyLevel.BEGINNER,
};

export const gameEngineSlice = createCustomSlice({
  name: 'gameEngine',
  initialState,
  reducers: {
    setUserTeam(state, action) {
      state.userTeam = action.payload;
    },
    setDifficultyLevel(state, action) {
      state.difficultyLevel = action.payload;
    },
    startGame(state) {
      state.canStartGame = true;
    },
    clickOnCell(state, action) {
      const { cellId } = action.payload;
      const { cells, activeTeam, fiftyStepsRuleCount } = state;
      const currentCell = findById(cellId, cells) as ICell;

      if (checkIsStep(currentCell.highlight)) {
        cells.forEach((cell) => {
          if (cell.id === currentCell.id) return;
          if (cell.enPassantCellId) cell.enPassantCellId = null;
        });

        const {
          canChangeTeam,
          canUpdateFullmoveNumber,
          needResetFiftyStepsRule,
          cellWithMutablePawnId,
          deadKingTeam,
          updatedCells,
        } = getAfterStepBoardState({
          currentCell,
          cells,
        });

        const activeTaamAfterStep = canChangeTeam ? getEnemyTeam(activeTeam) : activeTeam;

        resetCellsHighlight(updatedCells, activeTaamAfterStep);

        state.cells = updatedCells;
        state.deadKingTeam = deadKingTeam;
        state.cellWithMutablePawnId = cellWithMutablePawnId;
        canUpdateFullmoveNumber && ++state.fullmoveNumber;

        state.fiftyStepsRuleCount = calculateFiftyStepsRuleCount({
          needResetFiftyStepsRule,
          fiftyStepsRuleCount,
          canChangeTeam,
        });

        state.FEN = makeFEN({
          cells: state.cells,
          activeTeam: activeTaamAfterStep,
          fullmoveNumber: state.fullmoveNumber,
          fiftyStepsRuleCount: state.fiftyStepsRuleCount,
        });

        state.canChangeTeam = !!canChangeTeam;

        return;
      }

      const allowedSteps: IStep[] = getSteps({
        cells,
        currentCell,
      });
      resetCellsHighlight(cells, state.activeTeam);
      handleFigureSelect(cells, cellId, allowedSteps);
    },
    mutateFigure(state, action) {
      const { cells, activeTeam } = state;
      const { cellId, figureType } = action.payload;
      state.cells.forEach((cell) => {
        if (cell.animationConfig) cell.animationConfig = [];
      });
      const currentCell = findById(cellId, cells) as ICell;
      if (!currentCell?.figure) return;
      currentCell.highlight = HighlightType.SELECTED;

      currentCell.animationConfig = [
        {
          id: uniqId(),
          action: AnimationActionType.SWAP_HIDE,
          figureName: getFigureSvgName(currentCell.figure),
        },
        {
          id: uniqId(),
          action: AnimationActionType.SWAP_SHOW,
          figureName: getFigureSvgName({
            team: currentCell.figure.team,
            type: figureType,
          }),
          styles: { transform: 'scale(0)' },
        },
      ];

      currentCell.figure.type = figureType;

      const {
        canUpdateFullmoveNumber,
        canChangeTeam,
        cellWithMutablePawnId,
        deadKingTeam,
        updatedCells,
      } = getAfterStepBoardState({
        currentCell,
        cells,
      });

      const activeTaamAfterStep = canChangeTeam ? getEnemyTeam(activeTeam) : activeTeam;

      resetCellsHighlight(updatedCells, activeTaamAfterStep);

      state.cellWithMutablePawnId = cellWithMutablePawnId;
      state.cells = updatedCells;
      canUpdateFullmoveNumber && ++state.fullmoveNumber;
      state.deadKingTeam = deadKingTeam;
      state.FEN = makeFEN({
        cells: updatedCells,
        activeTeam: activeTaamAfterStep,
        fullmoveNumber: state.fullmoveNumber,
        fiftyStepsRuleCount: state.fiftyStepsRuleCount,
      });

      state.canChangeTeam = !!canChangeTeam;
    },
    changeActiveTeam(state) {
      state.canChangeTeam = false;
      state.activeTeam = getEnemyTeam(state.activeTeam);
      state.cells.forEach((cell) => {
        if (cell.animationConfig.length) cell.animationConfig = [];
      });
    },
    resetCellsCoordinates({ cells }) {
      cells.forEach((cell) => {
        cell.coordinates = null;
      });
    },
    setCellCoordinates({ cells }, action) {
      const cell = cells.find((cell) => cell.id === action.payload.id);
      cell!.coordinates = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    startNewGame: (_, action) => {
      const config = action.payload;
      if (config) {
        const cells = arrangeCells(config as Record<FigureTeam, ConfigItemType[]>);

        return {
          ...initialState,
          cells,
          FEN: makeFEN({
            cells: cells,
            activeTeam: initialState.activeTeam,
            fiftyStepsRuleCount: initialState.fiftyStepsRuleCount,
            fullmoveNumber: initialState.fullmoveNumber,
          }),
        };
      }

      return initialState;
    },
    startEngineLoading: (state) => {
      state.loading = true;
    },
    setNextMove: (state, action) => {
      state.nextMove = action.payload;
    },
    finishEngineLoading: (state) => {
      state.loading = false;
    },
    setEngineError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const gameEngineActions = gameEngineSlice.actions;

export default gameEngineSlice.reducer;
