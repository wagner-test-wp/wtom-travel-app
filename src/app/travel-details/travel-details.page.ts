import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute } from '@angular/router';
import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar, IonButton, IonAlert, IonInput, IonModal } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';
import { NgClass } from "@angular/common";

//import * as L from 'leaflet';
//import 'leaflet-gpx'

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
    imports: [IonModal, IonInput, IonAlert, IonButton, IonList, IonTitle, IonCard, IonCardTitle, IonToolbar, IonContent, IonButtons,
    IonItem, IonHeader, IonCardSubtitle, IonCardContent, IonMenuButton, IonLoading, IonIcon, NgClass,CommonModule],

})
export class TravelDetailsPage implements OnInit {

  forras_url ="https://adatbazis-ced.hu/travel/web/travel/upload/image/";

  travel_details : any[]=[];
  travel_id : any = 0;
  uzenet : string ="Részletek";

  nyitva : any[]=[];

  is_napi_terkep : boolean = false;
  terkep_nap_id : number =0;

  //private map!: L.Map;
  

  constructor(
        public travelService : TravelService,
        private route: ActivatedRoute,
        private router: Router,
  ) { }

  ngOnInit() {

    
    this.travel_id=this.route.snapshot.paramMap.get('id');
    this.travelService.getTravel(this.travel_id)
          .subscribe(data => {
            this.travel_details=data;

console.log(this.travel_details);

          });

  }

  tordeles(szoveg: string){
    return szoveg;
  }

  open_program(program_id : number){
    if (this.nyitva[program_id]===undefined){
      this.nyitva[program_id]=1;
    }
    else{
      if (this.nyitva[program_id]==1){
        this.nyitva[program_id]=0;
      }
      else{
        this.nyitva[program_id]=1;
      }
    }
  }

  setOpenNapiTerkep(ertek: boolean){
    this.is_napi_terkep=ertek;
  }

  open_terkep(nap_id : number,travel_id : number){
/*    this.terkep_nap_id=nap_id;
    this.setOpenNapiTerkep(true);

   // Kis késleltetés kell, hogy a modal ténylegesen megnyíljon
    setTimeout(() => {
      if (!this.map) {
        this.map = L.map('map').setView([47.4979, 19.0402], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap hozzájárulók'
        }).addTo(this.map);
      } else {
        this.map.invalidateSize(); // újraszámolás
      }
    }, 300);
*/
//console.log(programs);
//console.log(nap_id);

  this.router.navigate(['./map',nap_id,travel_id]);

  }

 close_terkep(){
/*     this.setOpenNapiTerkep(false);
   if (this.map) {
      this.map.remove();   // ha akarod, takarítsd ki
      this.map = undefined!;
    }*/

 }


	minosegClass (minoseg: number){
    return {
      'minoseg_must_see':  minoseg==6,
      'minoseg_kiemelt': minoseg==1,
      'minoseg_nagyon_jo': minoseg==2,
      'minoseg_jo': minoseg==3
    }
  }  

  ready_program(travel_id : number,program_id : number){
      this.travelService.readyProgram(travel_id,program_id)
              .subscribe(data => {
                console.log(data);
                this.travel_details=data;
              });

  }


}
