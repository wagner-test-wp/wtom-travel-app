import { inject, Injectable, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TravelResult, SubTravelResult, travelShort,programList} from './interfaces';


const BASE_URL ="https://adatbazis-ced.hu/travel/ajaxCall/travel/mobil-travel";

@Injectable({
  providedIn: 'root'
})


export class TravelService {

  //public newTravelList : any[]=[];
  //public newTravel : any[]=[];

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

  readyProgram(travel_id: number,program_id : number): Observable<travelShort[]>{
    const options={
      method: 'POST',
      params :{function: "ready_program",travel_id: travel_id,program_id : program_id}
    }

    return this.http.get<travelShort[]>(BASE_URL, options);

  }


  getDailyPrograms(day_id : number) : Observable<programList[]>{
      const options={
      method: 'POST',
      params :{function: "daily_programs",day_id: day_id}
    }

    return this.http.get<programList[]>(BASE_URL, options);

  }

  searchPoint(dist : number,lat :number, lon: number) : Observable<programList[]>{
      const options={
      method: 'POST',
      params :{function: "search_point",lat: lat, lon : lon,dist: dist}
    }

    return this.http.get<programList[]>(BASE_URL, options);

  }


}
