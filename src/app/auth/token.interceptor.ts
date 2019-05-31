import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public tokenService: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const objJWT = {
			setHeaders: {
				Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
			}
		};
		// console.log(objJWT, 'objJWTfsdv');
    request = request.clone(objJWT);
    // console.log(request, 'request df');
    return next.handle(request);
  }
}
