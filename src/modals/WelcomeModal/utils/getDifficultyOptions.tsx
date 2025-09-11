import { t } from 'i18next';

import FigureIcon from '@/components/FigureIcon';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { IDropdownOption } from '@/shared/components/Dropdown';
import { DifficultyLevel } from '@/store/slices/cells/types';

import classes from '../index.module.scss';

const getDifficultyOptions = (team: FigureTeam): IDropdownOption[] => [
  {
    value: DifficultyLevel.BEGINNER,
    label: t('difficulty.beginner'),
    icon: <FigureIcon name={`${FigureType.PAWN}_${team}`} className={classes.figure} />,
  },
  {
    value: DifficultyLevel.INTERMEDIATE,
    label: t('difficulty.intermediate'),
    icon: <FigureIcon name={`${FigureType.KNIGHT}_${team}`} className={classes.figure} />,
  },
  {
    value: DifficultyLevel.GRANDMASTER,
    label: t('difficulty.grandmaster'),
    icon: <FigureIcon name={`${FigureType.QUEEN}_${team}`} className={classes.figure} />,
  },
];

export default getDifficultyOptions;
