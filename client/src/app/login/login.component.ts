import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private email: string;
    private password: string;

    constructor(private authService: AuthService) {}

    login() {
        const userInfo = {
            email: this.email,
            password: this.password,
        };

        this.authService.login(userInfo);
    }
}
