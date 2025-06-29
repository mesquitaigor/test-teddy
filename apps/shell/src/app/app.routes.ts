import { Route } from '@angular/router';

import { NxWelcome } from './nx-welcome';


export const appRoutes: Route[] = [
  {
    path: 'user_identification',
    loadChildren: () =>
      import('user_identification/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
