import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter } from "react-router-dom";

import Amplify from "aws-amplify";
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);