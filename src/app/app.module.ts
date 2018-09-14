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
import { UserProvider } from '../providers/user/user';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import { SeekerProvider } from '../providers/seeker/seeker';
import { DonorProvider } from '../providers/donor/donor';
import {SearchPage} from "../pages/search/search";
import { NotificationProvider } from '../providers/notification/notification';
import {AcceptedDonorsPage} from "../pages/accepted-donors/accepted-donors";
import {NotificationPage} from "../pages/notification/notification";
import { RateProvider } from '../providers/rate/rate';

import { Ionic2RatingModule } from 'ionic2-rating';

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
    ContactPage,
    UserProfilePage,
    SearchPage,
    AcceptedDonorsPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    RegisterPage,
    TabsPage,
    AboutPage,
    ContactPage,
    UserProfilePage,
    SearchPage,
    AcceptedDonorsPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SeekerProvider,
    DonorProvider,
    NotificationProvider,
    RateProvider,
  ]
})
export class AppModule {}
