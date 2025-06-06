import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
    imports: [IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon
  ],

})
export class TravelDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
