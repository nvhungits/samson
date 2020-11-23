import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Company } from './company';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  companies: Company[];

  getAll(): Observable<any> {
    return this.http.get(environment.appUrl + "/api/company.php").pipe(
      map((res) => {
        this.companies = res['data'];
        return this.companies;
    }),
    catchError(this.handleError));
  }

  update(requestBody): Observable<any> {
    return this.http.put(
      environment.appUrl + "/api/update_company.php", 
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
