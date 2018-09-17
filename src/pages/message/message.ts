import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  @ViewChild(Content) content: Content;

  donor_username: string;
  chats = [];

  data = { nickname:'', message:'' };

  offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.donor_username = this.navParams.get('donor_username') as string;

    firebase.database().ref('Sajani/'+this.donor_username).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      console.log(this.chats);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });

  }

  ionViewDidLoad() {
  }

  sendMessage(donor_username: string) {
    let newData = firebase.database().ref('Sajani/'+donor_username).push();
    newData.set({
      sender: this.donor_username,
      receiver: 'Sajani',
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
