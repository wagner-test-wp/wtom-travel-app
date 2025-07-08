import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';
import { IonAlert } from '@ionic/angular/standalone';
import { IonModal,IonButton,IonInput,IonItemGroup } from '@ionic/angular/standalone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-erdekes-cikk',
  templateUrl: './erdekes-cikk.page.html',
  styleUrls: ['./erdekes-cikk.page.scss'],
 // standalone: false,
  imports: [IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,IonAlert,IonModal,IonItemGroup,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon,IonButton,IonInput,FormsModule,ReactiveFormsModule
  ],

})
export class ErdekesCikkPage implements OnInit {

  isModalOpen = false;
  formData: FormGroup;
  
  base_url : string ="http://adatbazis-ced.hu/travel/ajaxCall/travel/mobil-travel";


  constructor(
          private http:HttpClient
  ) {
        this.formData = new FormGroup({
      url: new FormControl()
     });

   }

  ngOnInit() {
  }

  // megnyitom a modális ablakot
  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

   onSubmit(){
      var options={
        method: 'POST',
        params :{
            url: this.formData.value.url,
            function : 'store_url'
          }
      }

  this.http.get(this.base_url,options).
    subscribe((response : any)=>{
      console.log(response);
    });

   } 

}
