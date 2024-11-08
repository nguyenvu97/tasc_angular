import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './layout/unauthen/login/login.component';
import { UnauthenComponent } from './layout/unauthen/unauthen.component';
import { JwtInterceptor } from './services/jwt/jwt.interceptor';
import { RegisterComponent } from './layout/unauthen/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BodyComponent} from "./layout/body/body.component";



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    UnauthenComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          if (localStorage.getItem('credential') == null || localStorage.getItem('credential') == undefined) {
            return 'a';
          }
          return JSON.parse(localStorage.getItem('credential') || '{}')['token'];
        },
      },
    }),
    BodyComponent,

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  exports: [
    FooterComponent,
    SidebarComponent,
    SidebarComponent
  ]
})
export class AppModule { }
