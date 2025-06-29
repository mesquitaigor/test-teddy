import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'clients',
    loadChildren: () => import('clients/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('user_identification/Routes').then((m) => m!.remoteRoutes),
  },
];
