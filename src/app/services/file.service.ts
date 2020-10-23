import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(requestBody): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', []);
    return this.http.post(environment.appUrl + "/api/upload.php", requestBody, {
      headers,
      responseType: 'text'
    }).pipe(
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
