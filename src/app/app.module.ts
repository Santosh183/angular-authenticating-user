import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { FakeResponseInterceptor } from './interceptors/fakeresponse-interceptor';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        FakeResponseInterceptor
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
