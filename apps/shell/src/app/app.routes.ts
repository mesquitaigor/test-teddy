import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('user_identification/Routes').then((m) => m!.remoteRoutes),
  },
];
