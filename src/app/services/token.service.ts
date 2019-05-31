import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  // getToken(): void {
  //   const token = localStorage.getItem(TOKEN);
  //   console.log(token, 'tokenfdg');
  // }
  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
