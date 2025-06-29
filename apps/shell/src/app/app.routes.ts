import { Route } from '@angular/router';
import { identificationGuard } from './shared/guards/identification-guard';

export const appRoutes: Route[] = [
  {
    path: 'clients',
    loadChildren: () => import('clients/Routes').then((m) => m!.remoteRoutes),
    canActivate: [identificationGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('user_identification/Routes').then((m) => m!.remoteRoutes),
  },
];
