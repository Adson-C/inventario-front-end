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
   /**
     * Salva um novo Produto
     * @param product Dados do produto a ser salvo
     * @returns Produto salvo
     */
    saveProduct(product: any){
      const endpoint = `${API_URL}/products`;
      return this.http.post(endpoint, product);
    }

    /**
   * Update categoria
   * @param product Dados da categoria a ser atualizada
   * @param id ID da categoria
   * @returns Categoria atualizada
   */
  updateProduct(product: any, id: number | string){
    const endpoint = `${API_URL}/products/${id}`;
    console.log('Service - Atualizando produto. Endpoint:', endpoint, 'Dados:', product);
    return this.http.put(endpoint, product);
  }
}
