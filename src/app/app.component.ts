import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";

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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

