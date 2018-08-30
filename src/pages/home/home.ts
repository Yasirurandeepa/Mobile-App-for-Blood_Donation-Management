import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {RegisterPage} from "../register/register";
import {AboutPage} from "../about/about";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  splash = true;

  constructor(public navCtrl: NavController) {
    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }

  login(){
    this.navCtrl.push(SigninPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  swipeEvent(e) {
    if(e.direction==4){
      this.navCtrl.push(AboutPage);
    }
  }
}
