import { cellNumbersBoundaryValues } from '@/entities/Cell/constants';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { ICell, NumberValueType } from '@/entities/Cell/types';
import {
  CastlingType,
  getCastlingType,
} from '@/services/stepsController/handlers/king/getCastlingSteps';
import { getKing } from '@/store/slices/cells/utils/helpers';

const getCastlingsFEN = (cells: ICell[]) => {
  const whiteCastlingsString = getFENTeamCastlings(cells, FigureTeam.WHITE);
  const blackCastlingsString = getFENTeamCastlings(cells, FigureTeam.BLACK);

  if (!whiteCastlingsString && !blackCastlingsString) return '-';

  return whiteCastlingsString + blackCastlingsString;
};

export default getCastlingsFEN;

function getCastlingChar(
  castlingType: CastlingType,
  team: FigureTeam = FigureTeam.WHITE,
) {
  const castlingFENChars = {
    [CastlingType.SHORT]: 'K',
    [CastlingType.LONG]: 'Q',
  };

  return team === FigureTeam.WHITE
    ? castlingFENChars[castlingType]
    : castlingFENChars[castlingType].toLowerCase();
}

function getFENTeamCastlings(cells: ICell[], team: FigureTeam = FigureTeam.WHITE) {
  const king = getKing(cells, team)!;
  if (!king || !king.figure?.isFirstStep) return '';
  if (!cellNumbersBoundaryValues.includes(king.id[1] as NumberValueType)) return '';

  const rooks = cells.filter(
    (cell) => cell.figure?.type === FigureType.ROOK && cell.figure.team === team,
  );

  const haveShortCastling = !!rooks.find(
    (rook) =>
      getCastlingType(rook.id) === CastlingType.SHORT &&
      rook.figure?.isFirstStep &&
      cellNumbersBoundaryValues.includes(rook.id[1] as NumberValueType),
  );

  const haveLongCastling = !!rooks.find(
    (rook) =>
      getCastlingType(rook.id) === CastlingType.LONG &&
      rook.figure?.isFirstStep &&
      cellNumbersBoundaryValues.includes(rook.id[1] as NumberValueType),
  );

  if (haveShortCastling && haveLongCastling)
    return (
      getCastlingChar(CastlingType.SHORT, team) + getCastlingChar(CastlingType.LONG, team)
    );

  if (haveShortCastling) return getCastlingChar(CastlingType.SHORT, team);
  if (haveLongCastling) return getCastlingChar(CastlingType.LONG, team);
  return '';
}
