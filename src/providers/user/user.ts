import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  addDonor(data) {          // insert donor details
    return this.http.post('http://localhost:3000/add_new_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addUserDonor(data){       // insert donor details for user table
    return this.http.post('http://localhost:3000/add_new_user_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addSeeker(data) {         // insert seeker details
    return this.http.post('http://localhost:3000/add_new_seeker', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addUserSeeker(data){      // insert seeker details for user table
    return this.http.post('http://localhost:3000/add_new_user_seeker', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  searchUser(data) {       // get selected user details
    return this.http.post('http://localhost:3000/search_user', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

}
