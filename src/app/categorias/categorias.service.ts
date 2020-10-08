import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:8080/categorias';

  listarTodas(): Promise<any> {
    return this.http.get(this.URL).toPromise();
  }
}
