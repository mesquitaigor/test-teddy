import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from './user.service';

export const userIsIdentifiedGuard: (
  needIdentification?: boolean
) => CanActivateFn = (needIdentification = true) => {
  return (_, state) => {
    const router = inject(Router);
    const userService = inject(UserService);
    const userIdentified: boolean = userService.userIsIdentified();
    if (needIdentification) {
      if (!userIdentified) {
        router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      }
      return userIdentified;
    } else {
      if (userIdentified) {
        router.navigate(['/clients']);
      }
      return !userIdentified;
    }
  };
};
