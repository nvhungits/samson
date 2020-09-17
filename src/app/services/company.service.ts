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

  baseUrl = 'api';
  constructor(private http: HttpClient) { }
  companies: Company[];

  getAll(): Observable<any> {
    console.log("|-- Company Service");
    return this.http.get(environment.appUrl + "/api/company.php").pipe(
      map((res) => {
        this.companies = res['data'];
        return this.companies;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log("handleError", error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
