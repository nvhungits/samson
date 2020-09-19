import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Menu } from './menu';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }
  menues: Menu[];

  getAll(): Observable<any> {
    return this.http.get(environment.appUrl + "/api/menu.php").pipe(
      map((res) => {
        this.menues = res['data'];
        return this.menues;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log("handleError", error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
