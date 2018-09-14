import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the SeekerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeekerProvider {

  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  getSeekerDetails(data) {            // get selected seeker details
    return this.http.post('http://localhost:3000/get_seeker', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

  updateSeekerDetails(data) {         // update seeker details
    return this.http.patch('http://localhost:3000/update_seeker_details', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  searchDonors(data) {                // get selected donors by given blood type and district
    return this.http.post('http://localhost:3000/get_donors', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

  getAcceptedDonors(data) {           // get accepted donor details
    return this.http.post('http://localhost:3000/show_accepted_donors', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

  delete_seeker_profile(data) {       // delete seeker profile
    return this.http.post('http://localhost:3000/remove_seeker_profile', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
