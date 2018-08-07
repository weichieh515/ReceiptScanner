import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
//Interface
import { Receipt } from '../../interface/receipt';
/**
 * Generated class for the ReceiptComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptComponent {

  private receipt: Receipt;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController
  ) {
    this.receipt = this.params.get('receipt');
    console.log(this.receipt);
  }

  private dismiss(){
    this.viewCtrl.dismiss();
  }
}
