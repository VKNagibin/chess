import { FunctionComponent } from 'react';

import { IDropdownOption } from '@/shared/components/Dropdown';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

import classes from './index.module.scss';

interface ModalProps {
  list: IDropdownOption[];
  title: string;
}

const MobileDropdownModal: FunctionComponent<
  ModalComponentProps<string> & ModalProps
> = ({ submit, title, list, serviceProps }) => {
  return (
    <ModalTemplate className={classes.template} title={title} {...serviceProps}>
      <div className={classes.list}>
        {list.map((item) => (
          <button
            className={classes.element}
            key={item.value}
            onClick={() => {
              submit(item.value);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </ModalTemplate>
  );
};

export default MobileDropdownModal;
