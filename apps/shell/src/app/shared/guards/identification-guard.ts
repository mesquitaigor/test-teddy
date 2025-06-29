import { CanActivateFn } from '@angular/router';

export const identificationGuard: CanActivateFn = (route, state) => {
  return false;
};
