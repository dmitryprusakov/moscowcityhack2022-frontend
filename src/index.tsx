import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from 'store';
import Core from 'core';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('No root element detected!');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <BrowserRouter>
        <Core />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
