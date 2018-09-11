import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {RegisterPage} from "../register/register";
import {UserProvider} from "../../providers/user/user";
import {UserProfilePage} from "../user-profile/user-profile";

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

  @ViewChild("username") username;
  @ViewChild("password") password;

  valUsername: string;
  valPassword: string;

  valFields: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController,
              private user: UserProvider, public appCtrl: App) {
    this.valUsername = '';
    this.valUsername = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signUpUser(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.valUsername = '';
    this.valPassword = '';
    this.valFields = true;
    if(this.username.value==''){
      this.valUsername = 'Required Field!';
      this.valFields = false;
    }if(this.password.value==''){
      this.valPassword = 'Required Field!';
      this.valFields = false;
    }
    if(this.valFields == true){
      this.user.searchUser({
        username: this.username.value,
        password: this.password.value
      }).subscribe(
        result => {
          if (result.length)  {

            const type = result[0].type;

            if(type=='Admin'){
            }
            if(type=='Seeker'){
              this.navCtrl.popToRoot();
              this.appCtrl.getRootNav().setRoot(UserProfilePage);
              this.alert("You are successfully login as a seeker!")
            }
            if(type=='Donor'){
              this.navCtrl.popToRoot();
              this.appCtrl.getRootNav().setRoot(UserProfilePage);
              this.alert("You are successfully login as a donor!")
            }

          } else {
            this.valUsername = '';
            this.valPassword = 'Username and Password mismatched!!!';
            this.alert("User not found!");
          }
        }, error => {
          console.log(error);
          this.alert("Not a valid User!!!");
        }
      );
    }
  }

  // forgotPassword(){
  //   this.fire.auth.sendPasswordResetEmail(this.email.value).then(data => {
  //     console.log('got data', this.fire.auth.currentUser);
  //     this.alert('Successfully sent the password reset email');
  //   }).catch(error => {
  //     console.log('got an error', error);
  //     this.alert(error.message);
  //   });
  // }



  // signInUser(){
  //   if(this.fire.auth.currentUser.emailVerified){
  //     this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
  //       console.log('got data', this.fire.auth.currentUser);
  //       this.alert('Success you\'re logged in');
  //     }).catch(error => {
  //       console.log('got an error', error);
  //       this.alert(error.message);
  //     });
  //     console.log('Would Sign in user with', this.email.value, this.password.value);
  //   }else{
  //     this.alert('Email not Verified!');
  //   }
  // }

}
