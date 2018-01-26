import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    private tokenTitle: string = 'user_token';

    getJWT() {
        return localStorage.getItem(this.tokenTitle)
    }

    setJWT(token: string) {
        localStorage.setItem(this.tokenTitle, token);
    }

    removeJWT() {
        localStorage.removeItem(this.tokenTitle);
    }

}
