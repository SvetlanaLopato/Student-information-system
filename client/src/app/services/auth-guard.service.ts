import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate() {
        const userAuthorized = this.authService.isAuthorized();

        if (!userAuthorized && !this.authService.restoreSession()) {
            this.router.navigate(['/login']);

            return false;
        }

        return true;
    }

}
