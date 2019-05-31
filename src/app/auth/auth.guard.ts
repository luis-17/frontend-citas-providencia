import {CanActivate, Router} from '@angular/router';
import {Injectable, Output, EventEmitter } from '@angular/core';
import {TokenService} from '../services/token.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];
    if (this.tokenService.isLogged()) { 
      this.getInitConfig.emit({ class: '', login: false });
      return true;
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );
    return false;
  }
}
