import Home from '../pages/Home';
import Transform from '../pages/Transform'

import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: ComponentType<unknown>;
  page: string;
  auth?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    page: 'Home',
  },
  {
    path: '/transform',
    component: Transform,
    page: 'Transform', 
  }
];
