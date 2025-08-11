import FigureIcon from '@/components/FigureIcon';
import { FigureType } from '@/entities/Cell/enums';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import classes from '@/modals/PawnMutateModal/components/FiguresList/index.module.css';
import { useAppSelector } from '@/store/hooks';

const figuresTypesList = [
  FigureType.BISHOP,
  FigureType.ROOK,
  FigureType.KNIGHT,
  FigureType.QUEEN,
];

interface IProps {
  onSelectFigure: (type: FigureType) => void;
  selectedType: FigureType | null;
}

const FiguresList = ({ selectedType, onSelectFigure }: IProps) => {
  const currentStepTeam = useAppSelector(({ cells }) => cells.currentTeam);

  const getClasses = (type: FigureType) => {
    let classList = [classes.figure];

    if (selectedType == type) {
      classList.push(classes.selected);
    }

    return classList.join(' ');
  };

  return (
    <div className={classes.container}>
      {figuresTypesList.map((type) => (
        <button
          data-testid={`mutate_${type}`}
          className={getClasses(type)}
          key={type}
          onClick={() => {
            onSelectFigure(type);
          }}
        >
          <FigureIcon
            baseClass=""
            className={classes.svg}
            name={getFigureSvgName({
              type,
              team: currentStepTeam,
            })}
          />
        </button>
      ))}
    </div>
  );
};

export default FiguresList;
