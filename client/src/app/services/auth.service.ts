import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';

interface UserInfo {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    private authorized: boolean = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private storageService: StorageService,
    ) {}

    login(userInfo: UserInfo) {
        this.http
            .post('/api/login', userInfo)
            .subscribe((data: any) => {
                if (data && data.token) {
                    this.storageService.setJWT(data.token);
                    this.authorized = true;
                    this.router.navigate(['/profile']);
                }
            });
    }

    logout() {
        this.storageService.removeJWT();
        this.authorized = false;
        this.router.navigate(['./login']);
    }

    restoreSession() {
        const jwt: string = this.storageService.getJWT();

        if (!jwt) {
            return false;
        }

        this.http
            .post("/api/session", { token: jwt })
            .subscribe(() => {
                this.authorized = true;
    
                if (this.router && this.router.url === '/login') {
                    this.router.navigate(['/profile']);
                }
            });

        return true;
    }

    signUp(userInfo: UserInfo) {
        this.http
            .post('/api/signup', userInfo)
            .subscribe();
    }

    isAuthorized() {
        return this.authorized;
    }
}

