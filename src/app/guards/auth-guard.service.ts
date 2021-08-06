import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService) { }

  async canActivate(): Promise<boolean> {

    const user = await this.auth.getUser();
    const loggedIn = !!user;

    if (!loggedIn) {
      console.log('not allowed');
    }

    return loggedIn;
  }
}
