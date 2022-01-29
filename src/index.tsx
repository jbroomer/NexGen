import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import store from './redux/store';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  globalThis.reduxStore = store;
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// Register the service-worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        // eslint-disable-next-line no-console
        console.error('SW registration failed: ', registrationError);
      });
  });
}
