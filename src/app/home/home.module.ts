import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
//import { MessageComponentModule } from '../message/message.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
//    MessageComponentModule,
    HomePageRoutingModule,
    ReactiveFormsModule
   ],
  declarations: []
})
export class HomePageModule {}
