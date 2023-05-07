import styled, { keyframes } from 'styled-components';

const spin = keyframes`
     to {
        -webkit-transform: rotate(360deg);
      }
`;

const Spinner = styled('div')`
  display: block;
  width: 70px;
  height: 70px;
  border: 7px solid #3223ff3a;
  border-radius: 50%;
  border-top-color: #5a23ff;
  animation: ${spin} 1s linear infinite;
`;

export { Spinner };
