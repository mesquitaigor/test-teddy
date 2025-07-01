import { userIsIdentifiedGuard } from '@teddy/auth';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'selected-clients',
    loadChildren: () =>
      import('selected_clients/Routes').then((m) => m.remoteRoutes),
    canActivate: [userIsIdentifiedGuard()],
  },
  {
    path: 'clients',
    loadChildren: () => import('clients/Routes').then((m) => m.remoteRoutes),
    canActivate: [userIsIdentifiedGuard()],
  },
  {
    path: '',
    loadChildren: () =>
      import('user_identification/Routes').then((m) => m.remoteRoutes),
    canActivate: [userIsIdentifiedGuard(false)],
  },
];
