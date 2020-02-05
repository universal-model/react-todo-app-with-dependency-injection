import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import diContainer from '@/diContainer';

diContainer.configure().then(() => {
  const rootElement = document.getElementById('app');

  if (rootElement) {
    render(<App />, rootElement);
  }
});
