import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
    private alertCtrl: AlertController
  ) {
    console.log('AlertProvider');
  }

  basic(title: string, confrimText: string, msg?: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [{
        text: confrimText
      }]
    });
    alert.present();
  }


  confirm(title: string, msg: string, confirmText: string, cancelText: string, onConfirm: Function, onCancel?: Function) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: () => onCancel()
        },
        {
          text: confirmText,
          handler: () => onConfirm()
        }
      ]
    });
    alert.present();
  }
}
