import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  @ViewChild("email") email;
  @ViewChild("password") password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser(){
    if(this.fire.auth.currentUser.emailVerified){
      this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
        console.log('got data', this.fire.auth.currentUser);
        this.alert('Success you\'re logged in');
      }).catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      });
      console.log('Would Sign in user with', this.email.value, this.password.value);
    }else{
      this.alert('Email not Verified!');
    }
  }

  signUpUser(){
    this.navCtrl.push(RegisterPage);
  }

  forgotPassword(){
    this.fire.auth.sendPasswordResetEmail(this.email.value).then(data => {
      console.log('got data', this.fire.auth.currentUser);
      this.alert('Successfully sent the password reset email');
    }).catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    });
  }
}
