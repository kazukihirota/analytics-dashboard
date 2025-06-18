import { createBrowserRouter, Navigate } from 'react-router';
import { Dashboard } from './pages/dashboard';
import { DashboardProvider } from './contexts/DashboardContext';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' replace />,
  },
  {
    path: '/dashboard',
    element: (
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    ),
  },
]);
