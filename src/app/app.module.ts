import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import { SignupPage} from '../pages/signup/signup'
import { BorrowPage} from '../pages/borrow/borrow'
import { LendPage} from '../pages/lend/lend'
import { PostPage} from '../pages/post/post'
import { RequestPage} from '../pages/request/request'
import { MessagePage} from '../pages/message/message'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QRCodeModule } from 'angular2-qrcode';
<<<<<<< HEAD
import {BarcodeScanner} from '@ionic-native/barcode-scanner'

=======
>>>>>>> 517f1fae25178aa63fe1629421052161010892f1
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    BorrowPage,
    LendPage,
    PostPage,
    MessagePage,
    RequestPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NgxQRCodeModule,
    QRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    BorrowPage,
    LendPage,
    PostPage,
    MessagePage,
    RequestPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    HttpClient,
    BarcodeScanner,
    ServiceProvider

  ]
})
export class AppModule {}
