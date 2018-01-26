import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate() {
        if (this.authService.isAuthorized()) {
            this.router.navigate(['/profile']);

            return false;
        }

        this.authService.restoreSession();

        return true;
    }

}
 