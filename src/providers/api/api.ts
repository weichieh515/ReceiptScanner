import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//Interface
import { Receipt } from '../../interface/receipt';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private url = "";

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  addReceipt(receipt: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(this.url, receipt)
  }

  setApiUrl(url: string) {
    this.url = url;
  }

  getApiUrl(): string {
    return this.url;
  }

}
