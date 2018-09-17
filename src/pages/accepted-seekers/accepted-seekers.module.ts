import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptedSeekersPage } from './accepted-seekers';

@NgModule({
  declarations: [
    AcceptedSeekersPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptedSeekersPage),
  ],
})
export class AcceptedSeekersPageModule {}
