import Home from '../pages/Home';
import UploadTable from '../pages/UploadTable'

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
    path: '/upload',
    component: UploadTable,
    page: 'UploadTable', 
  }
];
