import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NotificationProvider} from "../../providers/notification/notification";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  donor_notifications: any[];
  seekerSelected: boolean;

  user_name: string;
  email: string;
  nic: string;
  contact_number: string;
  gender: any;
  blood_group: any;
  district: any;
  address: string;
  rate_value: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private notification: NotificationProvider,
              private alertCtrl: AlertController) {
    this.show_donor_notifications();
    this.seekerSelected = false;
  }

  ionViewDidLoad() {
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  show_donor_notifications() {                                           //show pending notifications for relevant donor

    const donor_username = 'Yasiru';
    this.notification.queryDonorNotifications({
      donor_username: donor_username
    }).subscribe(
      donor_notifications => {
        this.donor_notifications = donor_notifications;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDonorNotification(donor_username, seeker_username) {              //reject the request from the seeker

    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to reject this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reject',
          handler: () => {
            this.notification.delete_donor_notification({
              donor_username: donor_username,                               //session username
              seeker_username: seeker_username
            }).subscribe(
              result => {
                this.alert("You have successfully deleted the request!");
                this.show_donor_notifications();
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

  updateDonorNotification(donor_username, seeker_username) {                  //accept the request from the seeker

    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to accept this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.notification.updateDonorNotification({
              donor_username: donor_username,
              seeker_username: seeker_username                 //////////// session username /////////////
            }).subscribe(
              result => {
                this.alert("You have successfully accepted the request!");
                this.show_donor_notifications();
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

  showDetails(details: any){
    this.seekerSelected = true;

    this.email = details.email;
    this.nic = details.NIC;
    this.contact_number = details.contact_no;
    this.address = details.address;
    this.gender = details.gender;
    this.blood_group = details.blood_group;
    this.district = details.district;
    this.user_name = details.seeker_username;
    this.rate_value = details.rate_value;

  }

  backToNotifications(){
    this.seekerSelected = false;
  }
}
