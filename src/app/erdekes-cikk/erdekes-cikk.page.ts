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
import { ErdekesCikkService } from '../services/erdekes-cikk.service';
import { LoadingController } from '@ionic/angular';



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
  isAlertOpen = false;

  alertButtons = ['OK'];


  formData: FormGroup;
  
  base_url : string ="http://adatbazis-ced.hu/travel/ajaxCall/travel/mobil-travel";
  urlList : any[]=[];


  constructor(
          private http:HttpClient,
              public loadingController: LoadingController,
              public erdekesCikkService : ErdekesCikkService,
          
  ) {
      this.formData = new FormGroup({
      url: new FormControl()
     });

   }

  ngOnInit() {
    console.log("kezdes");
    this.erdekesCikkService.getAllUrl()
          .subscribe(data => {
            console.log(data);
            this.urlList=data;
          });

  }

  // megnyitom a modális ablakot
  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

   onSubmit(){

        this.erdekesCikkService.storeUrl(this.formData.value.url)
          .subscribe(data => {
            console.log(data);
            this.setOpenModal(false);
            this.formData.reset();
            this.urlList=data;
            this.setOpen(true);

          });


  /*    var options={
        method: 'POST',
        params :{
            url: this.formData.value.url,
            function : 'store_url'
          }
      }

    this.http.get(this.base_url,options).
      subscribe((response : any)=>{
        console.log(response);
        this.setOpen(true);
      });
*/
   } 

  mindentBezar(){
    this.setOpen(false);
    this.setOpenModal(false);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


}
