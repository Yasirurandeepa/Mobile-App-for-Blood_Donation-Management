import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeekerProvider} from "../../providers/seeker/seeker";
import {NotificationProvider} from "../../providers/notification/notification";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  BloodGroup: any;
  District: any;

  donors: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private seeker: SeekerProvider, private alertCtrl: AlertController,
              private notification: NotificationProvider) {
    this.BloodGroup = 'O+';
    this.District = 'Galle';
    this.searchDonors();
  }

  ionViewDidLoad() {
  }

  filterBloodGroup(blood_group: any){
    this.BloodGroup = blood_group;
    this.searchDonors();
  }

  filterDistrict(district: any){
    this.District = district;
    this.searchDonors();
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  searchDonors() {                                                                  //search for needed donors
    this.seeker.searchDonors({
      blood_group: this.BloodGroup,
      district: this.District,
      seeker_username: 'Sajani'
    }).subscribe(
      donorDetails => {
        console.log(donorDetails);
        this.donors = donorDetails;
      },
      error => {
        console.log(error);
      }
    );
  }

  request_donor(donor_username: string) {                                                   //request from the particular donors

    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to request from this donor?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Request',
          handler: () => {
            this.notification.sendDonorNotification({
              donor_username: donor_username,
              seeker_username: 'Sajani'                                            //////////// session username /////////////
            }).subscribe(
              result => {
                this.alert("You have successfully requested from this donor!")
                this.searchDonors();
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  cancelRequest(donor_username: string){
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to cancel request?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.notification.delete_donor_notification({
              donor_username: donor_username,
              seeker_username: 'Sajani'                                            //////////// session username /////////////
            }).subscribe(
              result => {
                this.alert("You have successfully cancel the request!");
                this.searchDonors();
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  unfriend(donor_username: string){
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to unfriend '+ donor_username + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.notification.delete_donor_notification({
              donor_username: donor_username,
              seeker_username: 'Sajani'                                            //////////// session username /////////////
            }).subscribe(
              result => {
                this.alert("You have successfully unfriend " + donor_username);
                this.searchDonors();
              },
              error => {
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
