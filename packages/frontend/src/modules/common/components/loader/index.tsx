import { Backdrop } from '@mui/material';
import { FC } from 'react';
import * as Styled from './styles.styled';

type LoaderProps = {
  isLoading: boolean;
};

export const Spinner = () => <Styled.Spinner />;

export const Loader: FC<LoaderProps> = ({ isLoading }) => (
  <div>
    <Backdrop
      sx={{
        color: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={isLoading}
    >
      <Spinner />
    </Backdrop>
  </div>
);
