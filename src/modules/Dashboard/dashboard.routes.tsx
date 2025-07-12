import { lazy } from 'react'
import React from 'react'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: React.createElement(DashboardPage),
  },
]
