import { AfterViewInit, Component , OnInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-gpx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IonHeader,IonToolbar,IonContent,IonTitle,IonButtons,IonMenuButton, IonIcon, IonModal, IonButton, IonText } from "@ionic/angular/standalone";
import { IonSegmentView } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { TravelService } from '../services/travel.service';
import { MapService } from '../services/utils/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { IonSelect,IonSelectOption } from '@ionic/angular/standalone';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
    imports: [IonText, IonButton, IonModal, IonIcon, IonTitle,IonToolbar,IonContent,IonHeader,IonButtons,IonMenuButton,
      IonSelect,IonSelectOption
  ],

})

export class MapPage implements OnInit {

   @ViewChild('map') myMap!: ElementRef<HTMLDivElement>;
  private map!: L.Map;

  erkezo_adatok : any;
  day_id :any = 0;
  daily_programs : any[]=[];
  travel_id : any =0;
  lon : number = 16.867528133446875;
  lat : number = 41.12675312032173;
  leiras : string = "";
  megjegyzes: string ="";
  neve : string ="";
  is_lattam : number =0;
  program_id : number = 0;
  is_program_details : boolean = false;
  selected_distance : number = 0;
  width: number = 0;
  height: number = 0;
  markers : L.Marker[]=[];

  constructor(
        public travelService : TravelService,
        public mapService : MapService,
        private route: ActivatedRoute,
        private router : Router,
        public platform : Platform 

  ) { 
    this.platform.ready().then(()=>{
      this.width=this.platform.width();
      this.height=this.platform.height();
      console.log("Kép mérete:"+this.width+" x "+this.height);
    });
  }

 ionViewDidEnter() {
            console.log("terkep betoltes:"+this.lat+"->"+this.lon);
/*
    if (!this.map) {
//      this.map = L.map('map').setView([41.12685009896545, 16.86804311757492], 13);
//        this.map = L.map('map').setView([40.666158350288,   16.609273506984852],15);
      this.map = L.map('map').setView([this.lat, this.lon], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap hozzájárulók'
      }).addTo(this.map);
    }

    L.control.scale({
      metric: true,     // méter és km
      imperial: false,  // mérföld kikapcsolva
      maxWidth: 200     // max szélesség pixelben
    }).addTo(this.map);

    this.map.invalidateSize();*/
  }


 /*ngAfterViewInit(): void {
    this.initMap();
    //this.loadGPX();
  }*/

  private initMap(): void {

    console.log("Fut init map");
    for(const program of this.daily_programs){
      console.log(program.lat);
    }

    this.map = L.map('map', {
//      center: [47.4979, 19.0402], // Budapest középpont
      center : [this.lat,this.lon],
      zoom: 13
    });

    // OSM réteg
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap hozzájárulók'
    }).addTo(this.map);

    this.map.invalidateSize();
  }

  ngOnInit() {
    this.travel_id=this.route.snapshot.paramMap.get('travel_id');
    this.day_id=this.route.snapshot.paramMap.get('day_id');
    if (this.day_id>0){
                  console.log("bizony volt NAP:"+this.day_id);
      this.show_map_day(this.day_id);
    }
    else{
            console.log("nem volt NAP");
    }
  }


  
  async ngAfterViewInit() {

    if (this.day_id==0){

      console.log("belefut a NINCS nap-ba");
      await this.loadMap();
    }  
   /* const div = this.myMap.nativeElement;
    const width = div.offsetWidth;
    const height = div.offsetHeight;

    console.log('DIV mérete:', width, 'x', height);*/
  }

  async loadMap(){
      const position= await Geolocation.getCurrentPosition();
      this.lat=position.coords.latitude;
      this.lon=position.coords.longitude;


              this.map = L.map('map').setView([this.lat, this.lon], 16);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap hozzájárulók'
              }).addTo(this.map);

            const hereIcon=L.icon({
                iconUrl : '../../assets/icon/here.svg',
                //iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),

                iconSize : [36,36],
                iconAnchor : [18,24],
                popupAnchor : [0,12]
            });
             var marker : any;
            if (this.day_id==0){
                marker = L.marker([this.lat, this.lon],{icon: hereIcon}).addTo(this.map);
                console.log("hozzaadom:"+this.lat);
            }



            this.map.invalidateSize();

  }

  getMapSize(distance_width: number,distance_height: number){
    const C=156543.03392804062;
    var mpp=distance_width*1000/this.width;
    var nagyitas_x=Math.floor(Math.log2(C*Math.cos(this.lat*Math.PI/108)/mpp));


    
    return nagyitas_x;
  }

  valtozott_a_terulet(event : any){
    console.log("Kiválasztott km:"+event.detail.value);
      this.markers.forEach(m=> this.map.removeLayer(m));
      this.markers = [];

      this.selected_distance=event.detail.value;
      this.show_map_area(event.detail.value,this.lat, this.lon);

  }

  show_map_day(day_id: number){
      this.travelService.getDailyPrograms(this.day_id)
        .subscribe(data => {
            this.daily_programs=data;

            var terkep_init_data=this.mapService.getMapInitData(this.daily_programs);

            if (!this.map) {
              this.map = L.map('map').setView([terkep_init_data.lat, terkep_init_data.lon], 16);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap hozzájárulók'
              }).addTo(this.map);
            }

            var min_lat : number ;
            var min_lon : number ;
            var max_lat : number ;
            var max_lon : number ;
            [min_lat ,min_lon,max_lat,max_lon]=this.mapService.getBounds(this.daily_programs);

            this.map.fitBounds([[min_lat ,min_lon],[max_lat,max_lon]]);

            this.set_map_marker();


            this.map.invalidateSize();
      });
  }

  show_map_area(distance : number ,lat : number, lon : number){
      this.travelService.searchPoint(distance,lat,lon)   
        .subscribe(data => {
            this.daily_programs=data;
            var lat_dist :number;
            var lon_dist: number;
            var total_distance: number;
            [total_distance,lat_dist,lon_dist]=this.mapService.getMaxLength(this.daily_programs);
            var terkep_meret=this.getMapSize(lat_dist,lon_dist);
            //this.map.setZoom(terkep_meret);
            var min_lat : number ;
            var min_lon : number ;
            var max_lat : number ;
            var max_lon : number ;
console.log(this.daily_programs);            
            [min_lat ,min_lon,max_lat,max_lon]=this.mapService.getBounds(this.daily_programs);
console.log(min_lat+" , "+min_lon+" , "+max_lat+" , "+max_lon);
            this.map.fitBounds([[min_lat ,min_lon],[max_lat,max_lon]]);
            //this.map.setZoom(6);

            //var terkep_init_data=this.mapService.getMapInitData(this.daily_programs);


            L.control.scale({
              metric: true,     // méter és km
              imperial: false,  // mérföld kikapcsolva
              maxWidth: 200     // max szélesség pixelben
            }).addTo(this.map);
            
            this.set_map_marker();

            this.map.invalidateSize();
      }); 

  }

  set_map_marker(){
            L.control.scale({
              metric: true,     // méter és km
              imperial: false,  // mérföld kikapcsolva
              maxWidth: 200     // max szélesség pixelben
            }).addTo(this.map);
            
            const svg='<svg width="128px" height="128px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M16.001 1.072c5.291 0 9.596 4.305 9.596 9.597 0 1.683-0.446 3.341-1.29 4.799l-8.307 14.394-8.308-14.395c-0.843-1.456-1.289-3.115-1.289-4.798 0-5.292 4.305-9.597 9.597-9.597zM16.001 14.4c2.058 0 3.731-1.674 3.731-3.731s-1.674-3.731-3.731-3.731c-2.058 0-3.732 1.674-3.732 3.731s1.674 3.731 3.732 3.731zM16.001 0.006c-5.889 0-10.663 4.775-10.663 10.663 0 1.945 0.523 3.762 1.432 5.332l9.23 15.994 9.23-15.994c0.909-1.57 1.432-3.387 1.432-5.332 0-5.888-4.774-10.663-10.662-10.663v0zM16.001 13.334c-1.472 0-2.666-1.193-2.666-2.665 0-1.471 1.194-2.665 2.666-2.665s2.665 1.194 2.665 2.665c0 1.472-1.193 2.665-2.665 2.665v0z" fill="#000000"> </path> </g></svg>';

            const customIcon=L.icon({
                iconUrl : '../../assets/icon/Map-Marker.png',
                //iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),

                iconSize : [24,32],
                iconAnchor : [12,32],
                popupAnchor : [0,16]
            });
            const lattamIcon=L.icon({
                iconUrl : '../../assets/icon/Map-Marker-Small.svg',
                //iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),

                iconSize : [48,40],
                iconAnchor : [12,40],
                popupAnchor : [0,24]
            });

            const hereIcon=L.icon({
                iconUrl : '../../assets/icon/here.svg',
                //iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),

                iconSize : [24,24],
                iconAnchor : [12,16],
                popupAnchor : [0,12]
            });

             var marker : any;
            if (this.day_id==0){
                marker = L.marker([this.lat, this.lon],{icon: hereIcon}).addTo(this.map);
                console.log("hozzaadom:"+this.lat);
            }

            this.markers.push(marker);

            this.daily_programs.forEach((loc, i) => {
              if (loc.is_lattam==0){
                marker = L.marker([loc.lat, loc.lon],{icon: customIcon}).addTo(this.map);
              }
              else{
                marker = L.marker([loc.lat, loc.lon],{icon: lattamIcon}).addTo(this.map);
              }
              marker.bindPopup(`<button id="popupBtn${i}">${loc.name}</button>`);

              marker.on('popupopen', () => {
                const btn = document.getElementById(`popupBtn${i}`);
                if (btn) {
                  btn.addEventListener('click', () => this.onMarkerClick(loc));
                }
              });

              this.markers.push(marker);

            });

  }


  vissza_lepes(travel_id : Number){
      this.router.navigate(['./travel-details',travel_id]);
  }

  close_program_details(){
    this.is_program_details=false;
    //marker.closePopup();
  }

  show_program_details(){
    this.is_program_details=true;
  }

  onMarkerClick(loc: any) {
//  alert(`Kattintottál: ${loc.name}`);
console.log(loc);
    this.neve=loc.name;
    this.leiras=loc.description;
    this.megjegyzes=loc.comment;
    this.is_lattam=loc.is_lattam;
    this.is_program_details=true;
    this.program_id=loc.id;
  }

  ready_program(nap_id : number,program_id : number){

    this.is_lattam=Math.abs(1-this.is_lattam);

    this.travelService.readyProgram(0,program_id)
      .subscribe(data => {

          this.markers.forEach(m=> this.map.removeLayer(m));
          this.markers = [];

          if (nap_id>0){
            this.show_map_day(nap_id);
          }
          else{
            this.show_map_area(this.selected_distance,this.lat, this.lon);
          }
      });



    console.log("indul a klikk");
/*      this.travelService.readyProgramOnMap(nap_id,program_id)
              .subscribe(data => {
                console.log(data);
                this.daily_programs=data;
              });
*/
  }

}
