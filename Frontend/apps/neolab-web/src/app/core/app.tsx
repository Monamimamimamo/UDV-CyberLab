import 'simplebar-react/dist/simplebar.min.css';
import { AppRouter } from './app-router';
import { AppProvider } from './app-provider';

export const App = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
);
