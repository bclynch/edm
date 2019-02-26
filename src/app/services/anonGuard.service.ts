import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AnonGuardService implements CanActivate {

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    // checks if there is a token and does not proceed if not
    const token = this.cookieService.get('edm-token');
    if (token) return true;
    this.router.navigate(['/']);
    return false;
  }
}
