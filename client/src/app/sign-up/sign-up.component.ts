import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    private email: string;
    private password: string;

    constructor(private authService: AuthService) {}

    signUp() {
        const userInfo = {
            email: this.email,
            password: this.password,
        };

        this.authService.signUp(userInfo);
    }

}
