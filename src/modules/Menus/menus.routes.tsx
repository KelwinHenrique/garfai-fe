import { lazy } from 'react'
import React from 'react'

const MenusTable = lazy(() => import('./pages/MenusTable'))

export const menusRoutes = [
  {
    path: '/menus',
    element: React.createElement(MenusTable),
  },
]


