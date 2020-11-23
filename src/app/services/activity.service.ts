import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Activity } from './activity';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }
  activities: Activity[];

  getAll(): Observable<any> {
    return this.http.get(environment.appUrl + "/api/activity.php").pipe(
      map((res) => {
        this.activities = res['data'];
        return this.activities;
    }),
    catchError(this.handleError));
  }

  update(requestBody): Observable<any> {
    return this.http.put(
      environment.appUrl + "/api/update_activity.php", 
      requestBody,
      {
        responseType: 'text'
      }
    ).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log("handleError", error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
