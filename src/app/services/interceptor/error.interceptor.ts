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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbiI6IntcIklkXCI6MCxcIk5hbWVcIjpcIlNCTVNcIixcIkxldmVsc1wiOlt7XCJJZFwiOjAsXCJOYW1lXCI6XCJPRkZJQ0VcIixcIlNjb3BlXCI6W1wiNUxESE8wMTU0NFwiXX1dLFwiUm9sZXNcIjpbe1wiSWRcIjowLFwiTmFtZVwiOlwiSU9cIixcIlBlcm1pc3Npb25zXCI6W1wiUENSRUFURVwiLFwiRkFWTElTVFwiXX1dfSIsIm5hbWVpZCI6IjAiLCJ1c2VySWQiOjE3NTMzOCwibmFtZSI6IkRFQkpBTkkgQkFJRFlBIChEQVMpIiwibmJmIjoxNzA3MzA1NTQyLCJleHAiOjI3MDczOTE5NDIsImlhdCI6MTcwNzMwNTU0Mn0.WEnvWNR1yaO7OKKSi1oFI-I7AZue0USB8jCB1reuClE';
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
        //
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          this.router.navigate(['/login']);
        }else{
          //
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
