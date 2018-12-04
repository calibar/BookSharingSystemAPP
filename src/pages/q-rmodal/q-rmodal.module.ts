import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRmodalPage } from './q-rmodal';

@NgModule({
  declarations: [
    QRmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(QRmodalPage),
  ],
})
export class QRmodalPageModule {}
