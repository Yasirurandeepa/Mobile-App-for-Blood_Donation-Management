import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';


import {TabsPage} from "../pages/tabs/tabs";
import {HomePage} from "../pages/home/home";
import {DonorPage} from "../pages/donor/donor";
import {RegisterPage} from "../pages/register/register";

const config = {
  apiKey: "AIzaSyB7X66peYIx9nhk0o9_tz40V6zY84aLYD8",
  authDomain: "blood-77479.firebaseapp.com",
  databaseURL: "https://blood-77479.firebaseio.com",
  projectId: "blood-77479",
  storageBucket: "blood-77479.appspot.com",
  messagingSenderId: "46225286869"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, icon: any}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);

    this.pages = [
      { title: 'User Profile', component: HomePage, icon: 'ios-person' },
      { title: 'Search', component: DonorPage, icon: 'ios-search' },
      { title: 'Accepted Donors', component: RegisterPage, icon: 'ios-key' }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

