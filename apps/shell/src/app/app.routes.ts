import { identificationGuard } from '@teddy/auth';
import { Route } from '@angular/router';


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
