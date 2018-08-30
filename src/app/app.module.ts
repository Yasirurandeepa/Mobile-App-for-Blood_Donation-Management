import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SigninPage} from "../pages/signin/signin";
import {RegisterPage} from "../pages/register/register";

import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {TabsPage} from "../pages/tabs/tabs";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";

const firebaseAuth = {
  apiKey: "AIzaSyB7X66peYIx9nhk0o9_tz40V6zY84aLYD8",
  authDomain: "blood-77479.firebaseapp.com",
  databaseURL: "https://blood-77479.firebaseio.com",
  projectId: "blood-77479",
  storageBucket: "blood-77479.appspot.com",
  messagingSenderId: "46225286869"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    RegisterPage,
    TabsPage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    RegisterPage,
    TabsPage,
    AboutPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
