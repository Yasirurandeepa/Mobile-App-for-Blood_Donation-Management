import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {RegisterPage} from "../register/register";
import {AboutPage} from "../about/about";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  splash = true;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
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
    let myAlert = this.alertCtrl.create();

    myAlert.setTitle("Register as");

    myAlert.addInput({
      type: 'radio',
      label: 'Donor',
      value: 'donor'
    });

    myAlert.addInput({
      type: 'radio',
      label: 'Seeker',
      value: 'seeker'
    });

    myAlert.addButton('Cancel');

    myAlert.addButton({
      text: 'Register',
      handler: data => {
        if(!isNullOrUndefined(data)){
          console.log(data);
          this.navCtrl.push(RegisterPage, {type: data});
        }else{
          this.alertCtrl.create({
            subTitle: 'Please Select a Type',
            buttons: ['OK']
          }).present();
        }
      }
    });

    myAlert.present();
  }

  swipeEvent(e) {
    if(e.direction==4){
      this.navCtrl.push(AboutPage);
    }
  }
}
