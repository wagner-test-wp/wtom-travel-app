import { inject, Injectable, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TravelResult, SubTravelResult, travelShort} from './interfaces';


const BASE_URL ="http://adatbazis-ced.hu/travel/ajaxCall/travel/mobil-travel";

@Injectable({
  providedIn: 'root'
})


export class TravelService {

  public newTravelList : any[]=[];
  public newTravel : any[]=[];

  constructor(private http: HttpClient) {}
 

  getAllTravel(): Observable<TravelResult[]>{
    const options={
      method: 'POST',
      params :{function: "travel_all"}
    }

    return this.http.get<TravelResult[]>(BASE_URL, options);

  }

  getTravel(travel_id: number): Observable<travelShort[]>{
    const options={
      method: 'POST',
      params :{function: "travel_programs",travel_id: travel_id}
    }

    return this.http.get<travelShort[]>(BASE_URL, options);

  }

}
