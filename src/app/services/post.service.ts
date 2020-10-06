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

  private handleError(error: HttpErrorResponse) {
    console.log("handleError", error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}