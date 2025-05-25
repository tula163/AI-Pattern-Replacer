// routes/index.tsx
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface RouteConfig {
  path: string
  component: LazyExoticComponent<ComponentType<any>>;
  page: string
  auth?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('../pages/Home')),
    page: 'Home',
  }

]
