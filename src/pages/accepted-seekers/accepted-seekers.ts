import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DonorProvider} from "../../providers/donor/donor";
import {MessagePage} from "../message/message";

/**
 * Generated class for the AcceptedSeekersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accepted-seekers',
  templateUrl: 'accepted-seekers.html',
})
export class AcceptedSeekersPage {

  BloodGroup: any;
  District: any;
  isSeekerSelected: boolean;

  acceptedSeekers: any[];

  user_name: string;
  email: string;
  nic: string;
  contact_number: string;
  gender: any;
  blood_group: any;
  district: any;
  address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private donor: DonorProvider, private alertCtrl: AlertController) {
    this.BloodGroup = 'O+';
    this.District = 'Galle';
    this.isSeekerSelected = false;
  }

  ionViewDidLoad() {
    this.showAcceptedSeekers();
  }

  filterBloodGroup(blood_group: any){
    this.BloodGroup = blood_group;
    this.showAcceptedSeekers();
  }

  filterDistrict(district: any){
    this.District = district;
    this.showAcceptedSeekers();
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  showAcceptedSeekers(){                                         //Get the list of accepted donors
    const donor_username = 'Yasiru';
    this.donor.getAcceptedSeekers({
      donor_username: donor_username,
      blood_group: this.BloodGroup,
      district: this.District
    }).subscribe(
      seekerDetails => {
        this.acceptedSeekers = seekerDetails;
      },
      error => {
        console.log(error);
      }
    );
  }

  showDetails(details: any){
    this.isSeekerSelected = true;

    this.email = details.email;
    this.nic = details.NIC;
    this.contact_number = details.contact_no;
    this.address = details.address;
    this.gender = details.gender;
    this.blood_group = details.blood_group;
    this.district = details.district;
    this.user_name = details.username;
  }

  backToNotifications(){
    this.isSeekerSelected = false;
  }

  sendMessage(seeker_username: any){
    this.navCtrl.push(MessagePage, {seeker_username: seeker_username});
  }

}
