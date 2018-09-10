import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {AngularFireAuth} from "angularfire2/auth";
import * as EmailValidator from 'email-validator';
import * as passwordValidator from 'password-validator';
import {UserProvider} from "../../providers/user/user";

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

  type: string;

  schema: any;

  @ViewChild("username") username;
  @ViewChild("email") email;
  @ViewChild("password") password;
  @ViewChild("confirmPassword") confirmPassword;
  @ViewChild("nic") nic;
  @ViewChild("contact_number") contact_number;
  @ViewChild("address") address;

  Username: string;
  Email: string;
  Password: string;
  NIC: string;

  isFirstForm: boolean;
  isSecondForm: boolean;
  isThirdForm: boolean;

  valUsername: string;
  valEmail: string;
  valPassword: string;
  valConfirmPassword: string;
  valFirstForm: boolean;

  valGender: string;
  valNIC: string;
  valBloodGroup: string;
  gender: any;
  blood_group: any;
  valSecondForm: boolean;

  valContact: string;
  valAddress: string;
  valDistrict: string;
  district: any;
  valThirdForm: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController,
              private user: UserProvider) {

    this.type = this.navParams.get('type') as string;

    this.isFirstForm = true;
    this.isSecondForm = false;
    this.isThirdForm = false;

    this.gender = '';
    this.district = '';
    this.blood_group = '';
    this.initializeFirstForm();

    // Add properties to it
    this.schema = new passwordValidator;
    this.schema
      .is().min(8)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()                                 // Must have digits
      .has().not().spaces()                           // Should not have spaces
      .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.push(SigninPage);
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  initializeFirstForm(){
    this.valUsername = '';
    this.valEmail = '';
    this.valPassword ='';
    this.valConfirmPassword = '';
    this.valFirstForm = true;
  }

  initializeSecondForm(){
    this.valGender = '';
    this.valNIC = '';
    this.valBloodGroup = '';
    this.valSecondForm = true;
  }

  initializeThirdForm(){
    this.valContact = '';
    this.valAddress = '';
    this.valDistrict = '';
    this.valThirdForm = true;
  }

  confirmFirstForm(){
    this.initializeFirstForm();
    if(this.username.value==''){
      this.valUsername = 'Required Field!';
      this.valFirstForm = false;
    }if(this.email.value==''){
      this.valEmail = 'Required Field!';
      this.valFirstForm = false;
    }else if(!EmailValidator.validate(this.email.value)) {
      this.valEmail = 'Invalid Email!';
      this.valFirstForm = false;
    }if(this.password.value==''){
      this.valPassword = 'Required Field!';
      this.valFirstForm = false;
    }if(this.confirmPassword.value==''){
      this.valConfirmPassword = 'Required Field!';
      this.valFirstForm = false;
    }if(this.password.value.length<8){
      console.log(this.schema.validate(this.password.value, { list: true }));
      this.valPassword = "Password must contain atleast 8 characters";
      this.valFirstForm = false;
    }else if(!this.schema.validate(this.password.value)){
      this.valPassword = "Password must contain digits, simple and capital letters and not contain any spaces";
      this.valFirstForm = false;
    }else if(this.password.value!=this.confirmPassword.value){
      this.valConfirmPassword = "password mismatched";
      this.valFirstForm = false;
    }if(this.valFirstForm == true) {
      this.Username = this.username.value;
      this.Email = this.email.value;
      this.Password = this.password.value;
      this.isFirstForm = false;
      this.isSecondForm = true;
    }
  }

  filterGender(gender: any){
    this.gender = gender;
  }

  filterBloodGroup(blood_group: any){
    this.blood_group = blood_group;
  }

  confirmSecondForm(){
    this.initializeSecondForm();
    if(this.gender==''){
      this.valGender = 'Required Field!';
      this.valSecondForm = false;
    }if(this.nic.value == ''){
      this.valNIC = 'Required Field!';
      this.valSecondForm = false;
    }else if(this.nic.value.length!=10 || (this.nic.value.charAt(this.nic.value.length-1)!='v' && this.nic.value.charAt(this.nic.value.length-1)!='V') || !/^[0-9]+$/.test(this.nic.value.substring(0,this.nic.value.length-1))){
      this.valNIC = 'Invalid NIC!';
      this.valSecondForm = false;
    }if(this.blood_group==''){
      this.valBloodGroup = 'Required Field!';
      this.valSecondForm = false;
    }if(this.valSecondForm == true){
      this.NIC = this.nic.value;
      this.isThirdForm = true;
      this.isSecondForm = false;
    }
  }

  filterDistrict(district: any){
    this.district = this.district;
  }

  register(){
    this.initializeThirdForm();
    if(this.contact_number.value==''){
      this.valContact = 'Required Field!';
      this.valThirdForm = false;
    }else if(!/^[0-9]+$/.test(this.contact_number.value) || this.contact_number.value.length !== 10){
      this.valContact = 'Invalid Contact Number!';
      this.valThirdForm = false;
    }if(this.address.value==''){
      this.valAddress = 'Required Field!';
      this.valThirdForm = false;
    }if(this.district==''){
      this.valDistrict = 'Required Field!';
      this.valThirdForm = false;
    }if(this.valThirdForm==true){
      this.isThirdForm = false;
      if(this.type == 'donor'){
        this.user.addUserDonor({
          username: this.Username,
          password: this.Password,
          type: "Donor"
        }).subscribe(
          result => {
          }, error => {
            console.log(error);
          }
        );
        this.user.addDonor({
          username: this.Username,
          email: this.Email,
          gender: this.gender,
          nic: this.NIC,
          blood_group: this.blood_group,
          contact_no: this.contact_number.value,
          address: this.address.value,
          district: this.district,
          type: "Donor"
        }).subscribe(
          result => {
            this.alert("You have successfully registered as a donor!")

          }, error => {
            console.log(error);
          }
        );
      }else if(this.type == 'seeker'){
        this.user.addUserSeeker({
          username: this.Username,
          password: this.Password,
          type: "Seeker"
        }).subscribe(
          result => {
          }, error => {
            console.log(error);
          }
        );
        this.user.addSeeker({
          username: this.Username,
          email: this.Email,
          gender: this.gender,
          nic: this.NIC,
          blood_group: this.blood_group,
          contact_no: this.contact_number.value,
          address: this.address.value,
          district: this.district,
          type: "Donor"
        }).subscribe(
          result => {
            this.alert("You have successfully registered as a seeker!")

          }, error => {
            console.log(error);
          }
        );
      }
    }
  }

  backtoFirstForm(){
    this.isSecondForm = false;
    this.isFirstForm = true;
  }

  backtoSecondForm(){
    this.isThirdForm = false;
    this.isSecondForm = true;
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
