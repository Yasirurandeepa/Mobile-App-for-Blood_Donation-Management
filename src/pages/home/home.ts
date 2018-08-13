import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
    this.navCtrl.push(SigninPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
