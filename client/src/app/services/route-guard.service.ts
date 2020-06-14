import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor() {}
  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const isAdmin = user.role === 'EMPLOYEE' ? false : true;
      if (isAdmin) {
        return true;
      } else if ('id' in route.params) {
        return route.params.id === user.id.toString() ? true : false;
      } else {
        return false;
      }
    } else if (route.routeConfig.path === 'createEmployee') {
      return true;
    } else {
      return false;
    }
  }
}
