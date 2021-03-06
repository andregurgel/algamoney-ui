import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }
    const clonedRequest = req.clone({ headers: req.headers.append('Content-Type', 'application/json') });

    return next.handle(clonedRequest);
  }
}
