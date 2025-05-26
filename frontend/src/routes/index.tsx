import Home from '../pages/Home';
import Regex from '../pages/Regex';
import TablePage from '../pages/TablePage';
import UploadTable from '../pages/UploadTable'

import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
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
    path: '/regex',
    component: Regex,
    page: 'Regex',
  },
  {
    path: '/table',
    component: TablePage,
    page: 'Table',
  },
  {
    path: '/upload',
    component: UploadTable,
    page: 'UploadTable', 
  }
];
