import classes from './index.module.scss';

interface IProps {
  items: ButtonItem[];
}

interface ButtonItem {
  onClick: (result?: void | undefined) => void;
  type: 'submit';
  text: string;
}

const ModalButton = ({ items }: IProps) => {
  return (
    <div className={classes.buttonsContainer}>
      {items.map(({ text, type, onClick }, index) => (
        <button
          key={index}
          className={[classes[type], classes.button].join(' ')}
          onClick={onClick}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default ModalButton;
