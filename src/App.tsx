/// <reference types="vite-plugin-svgr/client" />

import './App.less';

import { useCallback, useMemo } from 'react';

import BlackPawn from './icons/pawn_black.svg?react';
import WhitePawn from './icons/pawn_white.svg?react';

const cellsCountInsideOneRow = 8;

const getBaseCellData = (): ICell => ({
  id: 0,
  color: CellColor.WHITE,
  char: CellChar.A,
  number: CellNumber.ONE,
});

const CellChar = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
} as const;

const cellCharsList = Object.values(CellChar);

const CellNumber: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
} as const;

const cellNumbersReversedList = Object.values(CellNumber).reverse();

enum CellColor {
  WHITE = 'white',
  BLACK = 'black',
}

type CharValueType = typeof CellChar[keyof typeof CellChar];
type NumberValueType = typeof CellNumber[keyof typeof CellNumber];

interface ICell {
  id: number;
  color: CellColor;
  char: CharValueType;
  number: NumberValueType;
}

function App() {
  const generateCells = useCallback((): React.ReactElement[] => {
    let cellsList: ICell[] = useMemo(() => new Array(64).fill(getBaseCellData()), []);

    cellsList = cellsList.map((_, index) => {
      const currentRowNumber = parseInt(String(index / cellsCountInsideOneRow));
      const currentColumnNumber = cellsCountInsideOneRow * currentRowNumber - index;

      const defaultFields = {
        id: index,
        number: cellNumbersReversedList[currentRowNumber] as unknown as NumberValueType,
        char: cellCharsList[currentColumnNumber] as CharValueType,
      };

      const isEvenRow = Boolean(currentRowNumber % 2);
      const isEvenCell = index % 2 === 0;

      if (!isEvenRow && isEvenCell)
        return {
          color: CellColor.BLACK,
          ...defaultFields,
        };
      if (isEvenRow && !isEvenCell)
        return {
          color: CellColor.BLACK,
          ...defaultFields,
        };

      return { color: CellColor.WHITE, ...defaultFields };
    });

    return cellsList.map((chess) => (
      <div key={chess.id} className={`cell ${chess.color}`}>
        {chess.number === CellNumber.SEVEN ? (
          <BlackPawn width="70px" height="70px" />
        ) : null}
        {chess.number === CellNumber.TWO ? (
          <WhitePawn width="70px" height="70px" />
        ) : null}
      </div>
    ));
  }, []);

  return (
    <div className="app-container">
      <div className="board">
        <div className="charset">
          {cellCharsList.map((char) => {
            return (
              <div key={char} className="char">
                {char}
              </div>
            );
          })}
        </div>
        {generateCells()}

        <div className="numset">
          {cellNumbersReversedList.map((number) => {
            return (
              <div key={number} className="number">
                {number}
              </div>
            );
          })}
        </div>

        <div className="numset append">
          {cellNumbersReversedList.map((number) => {
            return (
              <div key={number} className="number">
                {number}
              </div>
            );
          })}
        </div>

        <div className="charset append">
          {cellCharsList.map((item) => {
            return (
              <div key={item} className="char">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
