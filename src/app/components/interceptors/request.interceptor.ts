import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  token: Observable<string>;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
          req = req.clone({
            headers: req.headers.set("Authentication", "Bearer " + this.token.subscribe(t => t))
          });
        return next.handle(req);
        }
}