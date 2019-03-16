import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    console.log(localStorage.getItem(TOKEN),'localStorage.getItem(TOKEN)');
    return localStorage.getItem(TOKEN) != null;
  }
}
