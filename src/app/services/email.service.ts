import { Injectable } from '@angular/core';
import { ENV } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmailService {

  constructor(
    private http: Http
  ) {

  }

  sendResetEmail(user: string, pw: string) {
    return this.http.post(`${ENV.apiBaseURL}/mailing/reset`, { user, pw })
      .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    ));
  }

  sendContactEmail(data: { why: string; name: string; email: string; content: string; }) {
    return this.http.post(`${ENV.apiBaseURL}/mailing/contact`, { data })
      .pipe(map(
        (response: Response) => {
          const json = response.json();
          return json;
        }
      )
      ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      ));
  }
}
