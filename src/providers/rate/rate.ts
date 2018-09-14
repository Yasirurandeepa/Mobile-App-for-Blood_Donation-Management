import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RateProvider {

  private http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  rateDonor(data) {             // insert a rate
    return this.http.post('http://localhost:3000/rate_donor', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  getDonorRates() {             //get rates of the donors
    return this.http.get('http://localhost:3000/get_donor_overview',
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})})).map(res => res.json());
  }

}
