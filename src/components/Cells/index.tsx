import Cell from '@components/Cell';
import { useList } from 'effector-react';

import { $cells } from '@/stores/cell';

const Cells = () => {
  const cellsList = useList($cells, (cell) => <Cell key={cell.id} cell={cell} />);
  return <>{cellsList}</>;
};

export default Cells;
