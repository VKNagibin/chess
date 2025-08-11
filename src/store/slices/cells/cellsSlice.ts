import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import {
  AnimationActionType,
  CellIdType,
  ICellAsPlainObject,
} from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { findById } from '@/shared/utils/findById';
import { uniqId } from '@/shared/utils/uniqId';
import createCustomSlice from '@/store/createCustomSlice';
import { ConfigItemType, teamsConfigs } from '@/store/slices/cells/placesConfig';
import { IStep } from '@/store/slices/cells/types';
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

interface IGameHistoryItem {
  cells: ICellAsPlainObject[];
  FEN: string;
  from: string;
  to: string;
}

export interface ICellsState {
  cells: ICellAsPlainObject[];
  currentTeam: FigureTeam;
  canChangeTeam: boolean;
  deadKingTeam: FigureTeam | null;
  cellWithMutablePawnId: CellIdType | null;
  FEN: string | null;
  fullmoveNumber: number;
  fiftyStepsRuleCount: number;
  history: IGameHistoryItem[];
}

const initialCells = arrangeCells(teamsConfigs);
const initialActiveTeam = FigureTeam.WHITE;
const initialFiftyStepsRuleCount = 0;
const initialFullmoveNumber = 1;

const initialState: ICellsState = {
  cells: initialCells,
  currentTeam: initialActiveTeam,
  canChangeTeam: false,
  deadKingTeam: null,
  cellWithMutablePawnId: null,
  FEN: makeFEN({
    cells: initialCells,
    currentTeam: initialActiveTeam,
    fiftyStepsRuleCount: initialFiftyStepsRuleCount,
    fullmoveNumber: initialFullmoveNumber,
  }),
  fullmoveNumber: initialFullmoveNumber,
  fiftyStepsRuleCount: initialFiftyStepsRuleCount,
  history: [],
};

export const cellsSlice = createCustomSlice({
  name: 'cells',
  initialState,
  reducers: {
    clickOnCell(state, action) {
      const { cellId } = action.payload;
      const { cells, currentTeam, fiftyStepsRuleCount } = state;
      const currentCell = findById(cellId, cells) as ICellAsPlainObject;

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

        const activeTaamAfterStep = canChangeTeam
          ? getEnemyTeam(currentTeam)
          : currentTeam;

        resetCellsHighlight(updatedCells, activeTaamAfterStep);

        state.cellWithMutablePawnId = cellWithMutablePawnId;
        state.cells = updatedCells;
        state.deadKingTeam = deadKingTeam;
        state.canChangeTeam = !!canChangeTeam;
        canUpdateFullmoveNumber && ++state.fullmoveNumber;

        state.fiftyStepsRuleCount = calculateFiftyStepsRuleCount({
          needResetFiftyStepsRule,
          fiftyStepsRuleCount,
          canChangeTeam,
        });

        state.FEN = makeFEN({
          cells: state.cells,
          currentTeam: activeTaamAfterStep,
          fullmoveNumber: state.fullmoveNumber,
          fiftyStepsRuleCount: state.fiftyStepsRuleCount,
        });

        return;
      }

      const allowedSteps: IStep[] = getSteps({
        cells,
        currentCell,
      });
      resetCellsHighlight(cells, state.currentTeam);

      handleFigureSelect(cells, cellId, allowedSteps);
    },
    mutateFigure(state, action) {
      const { cells, currentTeam } = state;
      const { cellId, figureType } = action.payload;
      state.cells.forEach((cell) => {
        if (cell.animationConfig) cell.animationConfig = [];
      });
      const currentCell = findById(cellId, cells) as ICellAsPlainObject;
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

      const activeTaamAfterStep = canChangeTeam ? getEnemyTeam(currentTeam) : currentTeam;

      resetCellsHighlight(updatedCells, activeTaamAfterStep);

      state.cellWithMutablePawnId = cellWithMutablePawnId;
      state.cells = updatedCells;
      state.canChangeTeam = !!canChangeTeam;
      canUpdateFullmoveNumber && ++state.fullmoveNumber;
      state.deadKingTeam = deadKingTeam;
      state.FEN = makeFEN({
        cells: updatedCells,
        currentTeam: activeTaamAfterStep,
        fullmoveNumber: state.fullmoveNumber,
        fiftyStepsRuleCount: state.fiftyStepsRuleCount,
      });
    },
    changeActiveTeam(state) {
      state.canChangeTeam = false;
      state.currentTeam = getEnemyTeam(state.currentTeam);
      state.cells.forEach((cell) => {
        if (cell.animationConfig.length) cell.animationConfig = [];
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
            currentTeam: initialState.currentTeam,
            fiftyStepsRuleCount: initialState.fiftyStepsRuleCount,
            fullmoveNumber: initialState.fullmoveNumber,
          }),
        };
      }

      return initialState;
    },
  },
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;
