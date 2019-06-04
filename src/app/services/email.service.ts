import { Injectable } from '@angular/core';
import { ENV } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {

  constructor(
    private http: HttpClient
  ) {

  }

  sendResetEmail(email: string, pw: string) {
    return this.http.post(`${ENV.apiBaseURL}/mailing/reset`, { email, pw })
      .pipe(map(
        response => (response)
      )
      ).pipe(catchError(
        error => (Observable.throw('Something went wrong'))
    ));
  }

  sendContactEmail(data: { why: string; name: string; email: string; content: string; }) {
    return this.http.post(`${ENV.apiBaseURL}/mailing/contact`, { data })
      .pipe(map(
        response => (response)
      )
      ).pipe(catchError(
        error => (Observable.throw('Something went wrong'))
      ));
  }

  sendRegistrationEmail(email: string) {
    return this.http.post(`${ENV.apiBaseURL}/mailing/registration`, { email })
      .pipe(map(
        response => (response)
      )
      ).pipe(catchError(
        error => (Observable.throw('Something went wrong'))
      ));
  }
}
