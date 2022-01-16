import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

const loadingContainer = css`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
`;

const loadingIndicator = css`
  width: fit-content;
  top: 50%;
  left: 50%;
  position: relative;
  transform: translate(-50%, -50%);
`;

const LoadingIndicator = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setDots((currDots) => (currDots.length >= 3 ? '' : currDots.concat('.')));
    }, 500);

    return () => clearInterval(loaderInterval);
  }, []);

  return (
    <div css={loadingContainer}>
      <Typography variant="h5" css={loadingIndicator}>{`Loading${dots}`}</Typography>
    </div>
  );
};

export default LoadingIndicator;
