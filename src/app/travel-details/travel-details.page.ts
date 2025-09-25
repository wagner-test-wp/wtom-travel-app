import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute } from '@angular/router';
import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar, IonButton, IonAlert, IonInput, IonModal } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
    imports: [IonModal, IonInput, IonAlert, IonButton, IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon
  ],

})
export class TravelDetailsPage implements OnInit {

  forras_url ="https://adatbazis-ced.hu/travel/web/travel/upload/image/";

  travel_details : any[]=[];
  travel_id : any = 0;
  uzenet : string ="Részletek";

  nyitva : any[]=[];

  is_napi_terkep : boolean = false;
  terkep_nap_id : number =0;


  constructor(
        public travelService : TravelService,
        private route: ActivatedRoute,
    
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

  open_terkep(nap_id : number){
    this.terkep_nap_id=nap_id;
    this.setOpenNapiTerkep(true);
  }

}
