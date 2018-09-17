import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeekerProvider} from "../../providers/seeker/seeker";
import {DonorProvider} from "../../providers/donor/donor";
import * as EmailValidator from 'email-validator';
import {HomePage} from "../home/home";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  isValid: boolean;
  valGender: string;
  valGroup: string;
  valContact: string;
  valEmail: string;
  valDistrict: string;
  valAddress: string;
  valNIC: string;

  username: string;
  email: string;
  nic: string;
  contact_number: string;
  gender: any;
  blood_group: any;
  district: any;
  address: string;

  currentUser: any;
  userType: string;

  user_name: string;
  user_type;

  constructor(public navCtrl: NavController, public navParams: NavParams, private seeker: SeekerProvider,
              private donor: DonorProvider, private alertCtrl: AlertController) {
    this.user_name = this.navParams.get('username') as string;
    this.user_type = this.navParams.get('type') as string;
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  filterGender(gender: any){
    this.gender = gender;
  }

  filterBloodGroup(blood_group: any){
    this.blood_group = blood_group;
  }

  filterDistrict(district: any){
    this.district = district;
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  getUser(){

    if(this.user_type==='Seeker'){
      this.userType = 'Seeker';
      this.seeker.getSeekerDetails({
        username: this.user_name
      }).subscribe(
        seekerDetails => {
          this.currentUser = seekerDetails[0];
          this.email = this.currentUser.email;
          this.nic = this.currentUser.NIC;
          this.contact_number = this.currentUser.contact_no;
          this.address = this.currentUser.address;
          this.gender = this.currentUser.gender;
          this.blood_group = this.currentUser.blood_group;
          this.district = this.currentUser.district;
        },
        error => {
          console.log(error);
        }
      );
    }else if(this.user_type==='Donor'){
      this.userType = 'Donor';
      this.donor.getDonorDetails({
        username: this.user_name
      }).subscribe(
        donorDetails => {
          this.currentUser = donorDetails[0];
          this.email = this.currentUser.email;
          this.nic = this.currentUser.NIC;
          this.contact_number = this.currentUser.contact_no;
          this.address = this.currentUser.address;
          this.gender = this.currentUser.gender;
          this.blood_group = this.currentUser.blood_group;
          this.district = this.currentUser.district;
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  updateDetails() {
    if(this.validate()){
      if(this.user_type == 'Seeker'){
        let alert = this.alertCtrl.create({
          title: '',
          message: 'Are you sure want to update your profile?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Update',
              handler: () => {
                this.seeker.updateSeekerDetails({
                  username: this.user_name,
                  gender: this.gender,
                  blood_group: this.blood_group,
                  contact_no: this.contact_number,
                  email: this.email,
                  nic: this.nic,
                  address: this.address
                }).subscribe(
                  result => {
                    this.getUser();
                    this.alert("You have successfully updated your profile!")
                  }, error => {
                    console.log(error);
                  }
                );
              }
            }
          ]
        });
        alert.present();
      }else if(this.user_type == 'Donor'){
        let alert = this.alertCtrl.create({
          title: '',
          message: 'Are you sure want to update your profile?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Update',
              handler: () => {
                this.donor.updateDonorDetails({
                  username: this.user_name,
                  gender: this.gender,
                  blood_group: this.blood_group,
                  contact_no: this.contact_number,
                  email: this.email,
                  nic: this.nic,
                  address: this.address
                }).subscribe(
                  result => {
                    this.getUser();
                    this.alert("You have successfully updated your profile!")
                  }, error => {
                    console.log(error);
                  }
                );
              }
            }
          ]
        });
        alert.present();
      }

    }
  }

  validate() {
    this.isValid = true;

    this.valAddress = '';
    this.valDistrict = '';
    this.valGender = '';
    this.valGroup = '';
    this.valContact = '';
    this.valEmail = '';
    this.valNIC = '';

    if (this.gender === '') {
      this.valGender = 'This is a required field';
      this.isValid = false;
    } if (this.address === '') {
      this.valAddress = 'This is a required field';
      this.isValid = false;
    }  if (this.blood_group === '') {
      this.valGroup = 'This is a required field';
      this.isValid = false;
    } if (this.contact_number === '') {
      this.valContact = 'This is a required field';
      this.isValid = false;
    } if (this.email === '') {
      this.valEmail = 'This is a required field';
      this.isValid = false;
    } else if(!EmailValidator.validate(this.email)){               //check valid email address
      this.valEmail = "invalid email";
      this.isValid = false;
    } if (!/^[0-9]+$/.test(this.contact_number) || this.contact_number.length !== 10) {
      this.valContact = 'Invalid contact number';
      this.isValid = false;
    } if(this.nic===''){
      this.valNIC = "This is required field";
      this.isValid = false;
    } else if(this.nic.length!=10 || (this.nic.charAt(this.nic.length-1)!='v' && this.nic.charAt(this.nic.length-1)!='V') || !/^[0-9]+$/.test(this.nic.substring(0,this.nic.length-1))) {     //check valid NIC
      this.valNIC = "Invalid NIC";
      this.isValid = false;
    } if (this.isValid === true) {
      return true;
    } else {
      return false;
    }
  }

  deleteProfile() {
    if(this.user_type == 'Seeker'){
      let alert = this.alertCtrl.create({
        title: '',
        message: 'Are you sure want to delete your profile?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.seeker.delete_seeker_profile({
                username: this.user_name
              }).subscribe(
                result => {
                  this.navCtrl.pop();
                  this.alert("You have successfully deleted your profile!")
                }, error => {
                  console.log(error);
                }
              );
            }
          }
        ]
      });
      alert.present();
    }else if(this.user_type == 'Donor'){
      let alert = this.alertCtrl.create({
        title: '',
        message: 'Are you sure want to delete your profile?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.donor.delete_donor_profile({
                username: this.user_name
              }).subscribe(
                result => {
                  this.navCtrl.push(HomePage);
                  this.alert("You have successfully deleted your profile!")
                }, error => {
                  console.log(error);
                }
              );
            }
          }
        ]
      });
      alert.present();
    }

  }

}
