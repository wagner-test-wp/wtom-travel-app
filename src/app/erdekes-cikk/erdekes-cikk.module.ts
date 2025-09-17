import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { MessageComponentModule } from '../message/message.module';
import { ErdekesCikkPageRoutingModule } from './erdekes-cikk-routing.module';

import { ErdekesCikkPage } from './erdekes-cikk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErdekesCikkPageRoutingModule,
    ErdekesCikkPage
  ],
  //declarations: [ErdekesCikkPage]
})
export class ErdekesCikkPageModule {

}
