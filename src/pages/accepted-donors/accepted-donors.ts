import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeekerProvider} from "../../providers/seeker/seeker";
import {RateProvider} from "../../providers/rate/rate";
import {MessagePage} from "../message/message";

/**
 * Generated class for the AcceptedDonorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accepted-donors',
  templateUrl: 'accepted-donors.html',
})
export class AcceptedDonorsPage {

  BloodGroup: any;
  District: any;
  isDonorSelected: boolean;

  donors: any[];

  acceptedDonors: any[];
  donorOverview: any[];

  user_name: string;
  email: string;
  nic: string;
  contact_number: string;
  gender: any;
  blood_group: any;
  district: any;
  address: string;

  rateValue: any;
  rate_value;

  constructor(public navCtrl: NavController, public navParams: NavParams, private seeker: SeekerProvider, private rate: RateProvider,
              private alertCtrl: AlertController) {
    this.BloodGroup = 'O+';
    this.District = 'Galle';
    this.isDonorSelected = false;
  }

  ionViewDidLoad() {
    this.showAcceptedDonors();
    this.getDonorOverview();
  }

  filterBloodGroup(blood_group: any){
    this.BloodGroup = blood_group;
    this.showAcceptedDonors();
  }

  filterDistrict(district: any){
    this.District = district;
    this.showAcceptedDonors();
  }

  alert(message: string){
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  showAcceptedDonors(){                                         //Get the list of accepted donors
    const seeker_username = 'Sajani';
    this.seeker.getAcceptedDonors({
      seeker_username: seeker_username,
      donor_blood_group: this.BloodGroup,
      donor_district: this.District
    }).subscribe(
      donorDetails => {
        this.acceptedDonors = donorDetails;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDonorOverview(){                                           //Get the overall ratings of the accepted donors
    this.rate.getDonorRates().subscribe(
      donorRates => {
        this.donorOverview = donorRates;
      },
      error => {
        console.log(error);
      }
    );
  }

  rateDonor(donor_username: any){
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure want to rate '+ donor_username +'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rate',
          handler: () => {
            this.rate.rateDonor({
              donor_username: donor_username,
              seeker_username: 'Sajani',
              rate_value: this.rateValue
            }).subscribe(
              result => {
                this.showAcceptedDonors();                                        //refresh the rates
                this.getDonorOverview();
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
    this.isDonorSelected = true;

    this.email = details.email;
    this.nic = details.NIC;
    this.contact_number = details.contact_no;
    this.address = details.address;
    this.gender = details.gender;
    this.blood_group = details.blood_group;
    this.district = details.district;
    this.user_name = details.username;
    this.rate_value = details.rate_value;
  }

  backToNotifications(){
    this.isDonorSelected = false;
  }

  sendMessage(donor_username: any){
    this.navCtrl.push(MessagePage, {donor_username: donor_username});
  }

}

