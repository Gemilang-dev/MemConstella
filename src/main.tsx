// Ensure window.fetch has both getter and setter so that any external wrappers or extensions do not fail
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(fn) {
        currentFetch = fn;
      }
    });
  } catch {
    // Ignore if already defined
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GameDataProvider } from './contexts/GameDataContext.tsx';

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameDataProvider>
  </StrictMode>,
);
