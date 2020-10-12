import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  posts: Post[];

  getAll(): Observable<any> {
    return this.http.get(environment.appUrl + "/api/post.php").pipe(
      map((res) => {
        this.posts = res['data'];
        return this.posts;
    }),
    catchError(this.handleError));
  }

  update(requestBody): Observable<any> {
    return this.http.put(
      environment.appUrl + "/api/update_post.php", 
      requestBody,
      {responseType: 'text'}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  create(requestBody): Observable<any> {
    console.log("??");
    return this.http.post(
      environment.appUrl + "/api/create_post.php", 
      requestBody,
      {responseType: 'text'}).pipe(
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