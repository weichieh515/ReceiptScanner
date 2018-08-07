import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//Page
import { HomePage } from '../pages/home/home';
//Component
import { ReceiptComponent } from '../components/receipt/receipt';

//Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScannerProvider } from '../providers/scanner/scanner';
import { ParserProvider } from '../providers/parser/parser';
import { AlertProvider } from '../providers/alert/alert';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReceiptComponent
  ],
  providers: [
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScannerProvider,
    ParserProvider,
    AlertProvider
  ]
})
export class AppModule {}
