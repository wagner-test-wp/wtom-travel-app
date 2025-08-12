


import { inject, Injectable, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UrlResult} from './interfaces';


const BASE_URL ="https://adatbazis-ced.hu/travel/ajaxCall/travel/mobil-travel";

@Injectable({
  providedIn: 'root'
})


export class ErdekesCikkService {

  //public newTravelList : any[]=[];
  //public newTravel : any[]=[];

  constructor(private http: HttpClient) {}
 

  getAllUrl(): Observable<UrlResult[]>{
    const options={
      method: 'POST',
      params :{function: "url_all"}
    }

    return this.http.get<UrlResult[]>(BASE_URL, options);

  }


    storeUrl(url_to_store: string): Observable<UrlResult[]>{
    const options={
      method: 'POST',
      params :{function: "store_url",url: url_to_store}
    }

    return this.http.get<UrlResult[]>(BASE_URL, options);

  }


}
