import { memo } from 'react';

import classes from './index.module.css';

interface IProps {
  items: ButtonItem[];
}

interface ButtonItem {
  onClick: (result?: void | undefined) => void;
  buttonStyle?: string;
  text: string;
}

const ModalButtons = ({ items }: IProps) => {
  return (
    <div className={classes.buttonsContainer}>
      {items.map(({ text, buttonStyle, onClick }, index) => (
        <button
          key={index}
          className={classes[buttonStyle || 'submit']}
          onClick={onClick}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default memo(ModalButtons);
