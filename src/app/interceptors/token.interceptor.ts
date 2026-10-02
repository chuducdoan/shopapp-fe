import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }
        return next.handle(req);
    }
}