import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }



  getMapInitData(point_list : any[]){
    var lat : number;
    var lon : number;
      var gyujt_lat : number = 0;
            var gyujt_lon = 0;
            var szamol =0 ;
            for(const program of point_list){
              console.log(program.lat);
              gyujt_lat+=parseFloat(program.lat);
              gyujt_lon+=parseFloat(program.lon);
              szamol++;
            }

            console.log(gyujt_lat);
            lat=gyujt_lat/szamol;
            lon=gyujt_lon/szamol;

            console.log(lat+"->"+lon);

    var max_tavolsag=this.getMaxLength(point_list);

    return {lat: lat,lon: lon}
  }

  getMaxLength(point_list: any[]){
    var max_lon : number = -180;
    var min_lon : number = 180;
    var max_lat : number = -180;
    var min_lat : number = 180;

    var darab : number =0;
    var gyujt_lat: number =0;

    for(const program of point_list){
      if (program.lat>max_lat){
        max_lat=program.lat;
      }
      if (program.lat<min_lat){
        min_lat=program.lat;
      }
      if (program.lon>max_lon){
        max_lon=program.lon;
      }
      if (program.lon<min_lon){
        min_lon=program.lon;
      }

      gyujt_lat+=Math.abs(program.lat);
      darab++;
    }

    var atlag=gyujt_lat/darab;
    var lon_km=Math.abs(111*Math.cos(atlag));
    var lat_dist=(max_lat-min_lat)*111;
    var lon_dist=(max_lon-min_lon)*lon_km;

    var distance=Math.sqrt((lat_dist*lat_dist)+(lon_dist*lon_dist));

    return [distance,lat_dist,lon_dist];
  }


   getBounds(point_list: any[]){
    var max_lon  = -180;
    var min_lon  = 180;
    var max_lat  = -180;
    var min_lat  = 180;

    for(const program of point_list){
      if (program.lat>max_lat){
        max_lat=program.lat;
      }
      if (program.lat<min_lat){
        min_lat=program.lat;
      }
      if (program.lon>max_lon){
        max_lon=program.lon;
      }
      if (program.lon<min_lon){
        min_lon=program.lon;
      }
    }
    return[min_lat,min_lon,max_lat,max_lon];
  }

}
