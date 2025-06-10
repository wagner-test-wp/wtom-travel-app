import { Component, OnInit, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser'; // Import Capacitor's Browser plugin
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular'; 
import { IonicModule } from '@ionic/angular';
import { Md5 } from 'ts-md5';
import { environment } from 'src/environments/environment.prod';
import { PluginListenerHandle } from '@capacitor/core';
import { App,URLOpenListenerEvent } from '@capacitor/app';
import { Event } from '@angular/router'; 
import { STRING_TYPE } from '@angular/compiler';
import { PushNotifications,Token, ActionPerformed } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';
import { IonList,IonTitle,IonCard,IonCardTitle,IonToolbar } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent,IonButtons,
     IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon    
} from '@ionic/angular/standalone';
import { IonAlert } from '@ionic/angular/standalone';
import { IonModal,IonButton,IonInput,IonItemGroup } from '@ionic/angular/standalone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonList,IonTitle,IonCard,IonCardTitle,IonToolbar,IonContent,IonButtons,IonAlert,IonModal,IonItemGroup,
      IonItem,IonHeader, IonCardSubtitle,IonCardContent,IonMenuButton,IonLoading, IonIcon,IonButton,IonInput,FormsModule,ReactiveFormsModule
  ],
})



export class HomePage implements OnInit {

    base_url : string ="https://dtutor-teszt.woodpecker.hu/dTutor/";
    api_url :string ="https://dtutor-teszt.woodpecker.hu/dTutor/api/app_login.php";
    api_check : string ="https://dtutor-teszt.woodpecker.hu/dTutor/api/app_check_logout.php";
    //api_url :string ="https://dtutor.ai/dTutor/api/app_login.php";
    //api_check : string ="https://dtutor.ai/dTutor/api/app_check_logout.php";
    //base_url : string ="https://dtutor.ai/dTutor/";


  // az osztály változóinak definiálása
  responseText: string = '';
  formData: FormGroup;
  isAlertOpen = false;
  alertButtons = ['OK'];
  public alertMessage =""; 
  isModalOpen = false;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  belepokod= "";
  public is_desktop: any;
  mobile_identifier="";

  push_token="";

  constructor( 
      private http:HttpClient,
      public alertCtrl: AlertController,
      public platform : Platform 
    ) {
  
    // login űrlap definiálása  
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
     });
     // megnézzük milyen platformon fut
     this.is_desktop=platform.is('desktop');
  }

  
    ngOnInit() {
      if (!this.is_desktop){
        //  ha nem desktop, akkor aktiváljuk push notification uzeneteket
        this.registerNotifications ();
        this.addListeners();
      }
    }

  // aktiváljuk a push notification listenereket
  addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      localStorage.setItem('push_token',token.value);
      this.push_token=token.value;
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async registerNotifications () {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

  }

  async getDeliveredNotifications  ()  {
    const notificationList = await PushNotifications.getDeliveredNotifications();    
  }

  onSubmit(){
    var options={
      method: 'POST',
      params :{
          email: this.formData.value.email,
          password: Md5.hashStr(this.formData.value.password),
          push_token: ""
        }
    }

    var pToken  =localStorage.getItem('push_token');

    if (pToken!=null && pToken.length>0){
      options={
        method: 'POST',
        params :{
            email: this.formData.value.email,
            password: Md5.hashStr(this.formData.value.password),
            push_token: this.push_token
          }
      }
    }


   
  this.http.get(this.api_url,options).
    subscribe((response : any)=>{

      if (response.is_mehet=="on"){

        // sikerült az azonosítás
        localStorage.setItem('dtutor_url',response.url);
        localStorage.setItem('belepokod',response.belepokod);
        this.setOpenModal(false);
        response.url+="&from=mobile";
        response.url+="&mobile_identifier="+this.push_token;

        this.loginApp(response.url) ;
      }
      else{

        //hibás az azonosítás
        this.alertMessage=response.hiba;
        this.setOpen(true);
      }
    });
 
  }

  // dTutor indítása
  // ha a localStorage tartalmazza az URL-t akkor onnan
  // ha nem tartalmazza, akkor megnyitom a login modális ablakot

  start_dtutor(){
    var belepo_kod=localStorage.getItem('belepokod');
        
    if (belepo_kod!=null && belepo_kod.length>0){
      const options={
        method: 'POST',
        params :{belepo_kod: belepo_kod}
      }
      this.http.get(this.api_check,options).
        subscribe((response : any)=>{
          if (response.is_mehet=="on"){
              //rendben van
              if (response.statusz=="on"){
                //logout volt utoljára
                localStorage.setItem('dtutor_url','');
                localStorage.setItem('belepokod','');
              }
            }
            else{
    
              //hibás az azonosítás
              localStorage.setItem('dtutor_url','');
              localStorage.setItem('belepokod','');
            }
            this.start_belepes();
          });
        }
        else{
          this.start_belepes();
        }

  }

  // hiba esetén megnyitom/bezárom az Alert ablakot
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  // megnyitom a modális ablakot
  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async openWebApp() {
    // Open the webpage inside the app using Capacitor Browser
    await Browser.open({
      url: this.base_url,
      presentationStyle: 'fullscreen' // Makes it feel like it's part of the app
    });
  }

  // betöltöm a kívánt URL-t
  async loginApp(dtutor_url:string) {
    await Browser.open({
      url: dtutor_url,
      presentationStyle: 'fullscreen' // Makes it feel like it's part of the app
    });
  }


  check_logout(){
    var belepo_kod=localStorage.getItem('belepokod');
    if (belepo_kod!=null && belepo_kod.length>0){
      const options={
        method: 'POST',
        params :{belepo_kod: belepo_kod,push_token: this.push_token}
      }
      this.http.get(this.api_check,options).
      subscribe((response : any)=>{
        if (response.is_mehet=="on"){
          //rendben van
          if (response.statusz=="on"){
            //logout volt utoljára
            localStorage.setItem('dtutor_url','');
            localStorage.setItem('belepokod','');
          }
        }
        else{

          //hibás az azonosítás
          localStorage.setItem('dtutor_url','');
          localStorage.setItem('belepokod','');
        }
      });

    }

  }

  start_belepes(){
    var url=localStorage.getItem('dtutor_url');
    if (url==null || url.length==0){
      this.setOpenModal(true);
    }
    else{

      url+="&from=mobile";
      url+="&mobile_identifier="+this.push_token;
      //url+="&from=PC";
      this.loginApp(url);
    }
  }

}
