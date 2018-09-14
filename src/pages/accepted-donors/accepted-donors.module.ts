import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptedDonorsPage } from './accepted-donors';

@NgModule({
  declarations: [
    AcceptedDonorsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptedDonorsPage),
  ],
})
export class AcceptedDonorsPageModule {}
