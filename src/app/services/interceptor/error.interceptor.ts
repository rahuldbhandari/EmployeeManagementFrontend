import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService // Inject NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
     this.spinner.show(); // Show spinner before making the request
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // console.log('Incoming HTTP response', event);
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          this.router.navigate(['/login']);
        }else{
          // console.log(error);
          this.messageService.add({ key: 'common-toast', severity: 'error', summary: "Something went wrong !"});
        }

        return throwError(error); // Use throwError with the error object
      }),
      finalize(() => {
       
           this.spinner.hide(); // Hide spinner after the request is completed
        
        
        
      })
    );
  }
}
