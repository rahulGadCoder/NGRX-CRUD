import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Emp } from './model/emp.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  httpLogin(): Observable<any> {
    return
    // return this.http.post<any>("http://localhost:3000/employees", data)
    // .pipe(map(res => res), catchError(this.handleError));
  }


  httpGetRequest(): Observable<Emp[]> {
    // return this.http.get("http://localhost:3000/employees")
    //   .pipe(map(res => res), catchError(this.handleError));
    return this.http.get<Emp[]>("http://localhost:3000/employees");
  }


  httpPostRequest(data: Emp): Observable<Emp> {
    // return this.http.post<any>("http://localhost:8000/employees", data)
    //   .pipe(map(res => res), catchError(this.handleError));
    return this.http.post<Emp>("http://localhost:3000/employees", data);
  }




  httpPutRequest(data, id): Observable<any> {
    return this.http.put<any>("http://localhost:3000/employees/" + id, data)
      .pipe(map(res => res), catchError(this.handleError));
  }


  httpDeleteRequest(id): Observable<any> {
    return this.http.delete("http://localhost:3000/employees/" + id)
      .pipe(map(res => res), catchError(this.handleError));

  }

  httpGetRequestBYId(id: number): Observable<Emp> {
    // return this.http.get("http://localhost:8000/employees/" + id)
    //   .pipe(map(res => res), catchError(this.handleError));

    return this.http.get<Emp>("http://localhost:3000/employees/" +  id);

    // return this.http.get<Emp>("http://localhost:3000/employees/" +  id).pipe(map(res =>res),retry(1),catchError(this.handleError) )

  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  getCoutrie(): Observable<any> {
    return this.http.get("assets/countries.json")
      .pipe(map(res => res), catchError(this.handleError));
  }

  getCoutries() {
    return this.http.get('assets/countries.json')
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }




  // Subscriber and Observable Example //

  addToCart(product: string) {
    this.subject.next({ name: product })
  }

  clearCart() {
    this.subject.next();
  }

  getCart(): Observable<any> {
    return this.subject.asObservable();
  }


}
