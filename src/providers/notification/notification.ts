import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  sendDonorNotification(data) {          // send donor notifications
    return this.http.post('http://localhost:3000/send_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  queryDonorNotifications(data) {        // get notifications
    return this.http.post('http://localhost:3000/get_donor_notifications', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  updateDonorNotification(data) {         // update notification details
    return this.http.patch('http://localhost:3000/update_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  delete_donor_notification(data) {         // delete notifications
    return this.http.post('http://localhost:3000/remove_donor_notification', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
