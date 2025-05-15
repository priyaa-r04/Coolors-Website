import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './redux/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* ✅ Wrap your App here */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
