import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { HttpInterceptorService } from './services/http-interceptor.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const jwtConfig ={
    whitelistedDomains: ['localhost:3000'],
    tokenGetter: () => {
        const storageService = new StorageService();

        return storageService.getJWT();
    },
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProfileComponent,
        PageNotFoundComponent,
        SignUpComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: jwtConfig,
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
        StorageService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
