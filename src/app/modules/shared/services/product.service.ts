import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8082/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista de produtos
   * @returns Lista de produtos
   */
  getProducts(){
    const endpoint = `${API_URL}/products`;
    return this.http.get(endpoint);
  }
}
