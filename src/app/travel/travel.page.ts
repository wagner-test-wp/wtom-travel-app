import { Component, inject, OnInit, ViewChild } from '@angular/core';
//import { Browser } from '@capacitor/browser'; // Import Capacitor's Browser plugin
//import { CapacitorHttp, HttpResponse } from '@capacitor/core';
//import { FormControl, FormGroup } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { TravelResult, SubTravelResult } from '../services/interfaces';
import { TravelService } from '../services/travel.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
  imports: [IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon
  ],
})

export class TravelPage implements OnInit {

  travelList : any[]=[];
  public opened_main_travel=0;
  public opened_sub_travel=0;
  public uzenet="";

  constructor(
    //private http:HttpClient,
    public loadingController: LoadingController,
    public travelService : TravelService,
    private router: Router,
  ) { }

  ngOnInit() {
    //this.uj_olvas();
    this.travelService.getAllTravel()
          .subscribe(data => {
console.log(data);            
            this.travelList=data;
          });

  }

  async uj_olvas() {
    const loading =await this.loadingController.create({
        message: 'pleasa wait...'
    });

    loading.present();
    this.travelService.getAllTravel()
          .subscribe(data => {
            this.travelList=data;

            loading.dismiss();
          });
    this.travelService.getAllTravel()
          .subscribe({
            next:data => {
              this.travelList=data;
              loading.dismiss();},
            error: error =>{
              this.uzenet="hiba történt";
              //loading.dismiss();
             // console.log("hiba történt");
             // console.error("There was error!",error);
             // alert("hiba történt");
            }  
            });
    }


  open_main_travel(travel_id :number){
    this.opened_main_travel=travel_id;
  }

  open_sub_travel(travel_id :number){
    this.opened_sub_travel=travel_id;
  }

  select_travel(travel_id : number){
    this.router.navigate(['./travel-details',travel_id]);
  }

}
