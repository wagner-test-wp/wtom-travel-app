
import { Component, OnInit } from '@angular/core';

import { IonHeader } from '@ionic/angular/standalone';

import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar } from '@ionic/angular/standalone';

import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';
/*
@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
 // standalone: false,

})*/

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],

  imports: [IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon
  ],

  standalone: true,
})


export class TravelPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
