import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild("email") email;
  @ViewChild("password") password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.push(SigninPage);
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      console.log('got data', this.fire.auth.currentUser);
      this.alert('Registered!');
      this.fire.auth.currentUser.sendEmailVerification();
    }).catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    });
    console.log('Would register user with', this.email.value, this.password.value);
  }


}
