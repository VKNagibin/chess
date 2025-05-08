import {
  StyledCrossButton,
  StyledHeader,
  StyledModalCard,
  StyledOverlay,
} from '@/components/ModalContainer/styled';
import React, { memo, PropsWithChildren } from 'react';

interface IProps {
  title: string;
  withCloseButton?: boolean;
  buttons?: React.ReactElement | null;
}

const ModalContainer = ({
  title,
  withCloseButton,
  children,
  buttons = null,
}: PropsWithChildren<IProps>) => {
  return (
    <StyledOverlay>
      <StyledModalCard>
        <StyledHeader>
          <h3>{title}</h3>
          {!!withCloseButton && <StyledCrossButton />}
        </StyledHeader>
        {children}
        {buttons}
      </StyledModalCard>
    </StyledOverlay>
  );
};

export default memo(ModalContainer);
