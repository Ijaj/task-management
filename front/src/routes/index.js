import { useRoutes, Navigate } from 'react-router-dom';

// individual page imports
import Login from '../views/pages/auth/login';
import Signup from '../views/pages/auth/signup';
import ResetPassword from '../views/pages/auth/reset';
import Dashboard from '../views/pages/dashboard';
import Error404 from '../views/pages/error/404';
import Task from '../views/pages/dashboard/task';
import Spin from '../views/pages/dashboard/spin';

// layout imports
import DashboardLayout from '../views/layouts/dashboard';
import { ProtectedRoute } from '../routes/protected-route';

const mainRoutes = {
  path: 'dashboard',
  element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: 'task/:tid',
      element: <Task />,
    },
    {
      path: 'spin',
      element: <Spin />,
    }
  ],
};

const authRoutes = {
  path: 'auth',
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'signup',
      element: <Signup />
    },
    {
      path: 'reset',
      element: <ResetPassword />
    },
  ]
};

const errorRoute = {
  path: 'error',
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <Error404 />,
    }
  ],
};

const redirectRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/error" replace />,
  },
];

export default function Routes() {
  return useRoutes([mainRoutes, authRoutes, errorRoute, ...redirectRoutes]);
}
