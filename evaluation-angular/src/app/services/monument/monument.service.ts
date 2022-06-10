import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MonumentService {

  endpoint: string = environment.apiUrl;

  err:any;
  one:any
  msg = '';
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient) {
   }

  // Get all catégories
  getAllMonuments(): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/monuments.json`).pipe(
      catchError(this.handleError)
    )
    }
    // Get one Monument
  getOneMonument(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/monuments/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Post a new Monument -> Ask for the form value
  newMonument(form:any) {
    this.err = null;
    this.dataChange = form;
    return this.http.post<any>(`${this.endpoint}/monuments/new`, form).pipe(
      catchError(this.handleError)
    )
  }
  // Update Monument -> Ask for the form value
  updateMonument(form:any, id:number) {
    this.err = null;
    this.dataChange = new BehaviorSubject<any>(
      {
        "id": id,
        "name": form["name"],
        "image": form["image"],
      }
    )
    return this.http.post<any>(`${this.endpoint}/monuments/update/${id}`, form).pipe(
      catchError(this.handleError)
    )
  }

  // Delete a Monument
  deleteMonument(id:number) {
    return this.http.delete<any>(`${this.endpoint}/monuments/delete/${id}`).pipe(
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
}
