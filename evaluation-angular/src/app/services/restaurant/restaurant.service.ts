import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  endpoint: string = environment.apiUrl;
  err:any;
  msg = '';
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) {
  }

  // Get all Restaurants
  getAllRestaurants(): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/restaurants.json`)
  }

  // Get one Restaurant
  getOneRestaurant(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/restaurants/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Post a new Restaurant -> Ask for the form value // it's taking from the array color, the 'hex' value and concat # and the value
  newRestaurant(form:any) {
    this.err = null;
    this.dataChange = form
    return this.http.post<any>(`${this.endpoint}/restaurants/new`, form).pipe(
    catchError(this.handleError),
    )
  }

  // update Restaurant -> Ask for the form value
  updateRestaurant(form:any, id:number) {
    this.err = null;
    this.dataChange = new BehaviorSubject<any>({"id": id, "name": form["name"],"specialite": form["specialite"], "chien": form["chien"] , "image": form["image"] })
    return this.http.put<any>(`${this.endpoint}/restaurants/update/${id}`, form).pipe(
      catchError(this.handleError),
      )
  }

  // Delete an Restaurant
  deleteRestaurant(id:number){
    return this.http.delete<any>(`${this.endpoint}/restaurants/delete/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = error.error;
    }
    return throwError(msg);
  }

  loaderRestaurant(){
    let loader = true;

  }

}
