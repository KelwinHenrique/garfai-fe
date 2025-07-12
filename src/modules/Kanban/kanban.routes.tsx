import { lazy } from 'react'
import React from 'react'

const KanbanPage = lazy(() => import('./pages/KanbanPage'))

export const kanbanRoutes = [
  {
    path: '/kanban',
    element: React.createElement(KanbanPage),
  },
]


