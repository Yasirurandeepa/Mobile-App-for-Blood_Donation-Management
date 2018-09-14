import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DonorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DonorProvider {

  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  getDonorDetails(data) {             // get selected donor details
    return this.http.post('http://localhost:3000/get_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

  updateDonorDetails(data) {         // update donor details
    return this.http.patch('http://localhost:3000/update_donor_details', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  delete_donor_profile(data) {         // delete donor details
    return this.http.post('http://localhost:3000/remove_donor_profile', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
