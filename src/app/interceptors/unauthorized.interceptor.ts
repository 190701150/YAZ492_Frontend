import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.alertController.create({
              header: "Uyarı",
              message: "Oturumunuz bitti.",
              buttons: ['Tamam']
            }).then(alertController => alertController.present())
            this.router.navigateByUrl('/login')
          }
          return throwError(() => error);
        })
      )
  }
}
