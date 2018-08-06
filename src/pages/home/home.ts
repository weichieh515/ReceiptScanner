import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Provider
import { ScannerProvider } from '../../providers/scanner/scanner';
import { ParserProvider } from '../../providers/parser/parser';
import { AlertProvider } from '../../providers/alert/alert';
//Interface
import { Receipt } from '../../interface/receipt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  receipts = <Receipt[]>[]
  constructor(
    public navCtrl: NavController,
    private scanner: ScannerProvider,
    private parser: ParserProvider,
    private alert: AlertProvider
  ) { }

  doScan() {
    this.scanner.fakeScan(text => {
      if (this.parser.validate(text)) {
        if (this.parser.needScanRight(text)) {
          this.alert.confirm('請掃右側QRcode', '', '確定', '取消', () => {
            this.scanRight(this.parser.amountNotScaned(text), textRight => {
              text = text += textRight;
              this.receipts.push(this.parser.receipt(text));
              console.log(this.parser.receipt(text));
            })
          })
        }
        else {
          this.receipts.push(this.parser.receipt(text));
          console.log(this.parser.receipt(text));
        }
      } else {
        this.alert.basic('此發票格式不合', '確定')
      }
    });
  }

  scanRight(amountNotScaned: number, callback) {
    this.scanner.fakeScanRight(text => {
      if (this.parser.validateRight(text, amountNotScaned)) return callback(text);
      this.alert.confirm('請掃右側QRcode', '', '確定', '取消', () => this.scanRight(amountNotScaned, callback))
    })
  }


}