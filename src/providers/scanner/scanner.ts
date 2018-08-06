import { Injectable } from '@angular/core';
//Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//Provider
import { ParserProvider } from '../parser/parser';
/*
  Generated class for the ScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScannerProvider {

  private fakeData = 'AB112233441020523999900000144000001540000000001234567ydXZt4LAN1U HN/j1juVcRA==:**********:3:3:0:乾電池:1:105:';
  private fakeDataMore = '**口罩:1:210:牛奶:1:25';

  constructor(
    private barcode: BarcodeScanner,
    private parser: ParserProvider
  ) {
    console.log('ScannerProvider');
  }

  scan() {
    this.barcode.scan().then(data => {
      this.parser.receipt(data.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  fakeScan(callback) {
    return callback(this.fakeData);
  }

  fakeScanRight(callback) {
    return callback(this.fakeDataMore);
  }

}
