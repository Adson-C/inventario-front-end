import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8082/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista de categorias
   * @returns Lista de categorias
   */
  getCategories(){
    const endpoint = `${API_URL}/categories`;
    return this.http.get(endpoint);
  }
    /**
   * Salva uma nova categoria
   * @param category Dados da categoria a ser salva
   * @returns Categoria salva
   */
  saveCategory(category: any){
    const endpoint = `${API_URL}/categories`;
    return this.http.post(endpoint, category);
  }
  /**
   * Update categoria
   * @param category Dados da categoria a ser atualizada
   * @param id ID da categoria
   * @returns Categoria atualizada
   */
  updateCategory(category: any, id: number | string){
    const endpoint = `${API_URL}/categories/${id}`;
    console.log('Service - Atualizando categoria. Endpoint:', endpoint, 'Dados:', category);
    return this.http.put(endpoint, category);
  }
   /**
   * Update categoria
   * @param category Dados da categoria a ser atualizada
   * @param id ID da categoria
   * @returns Categoria atualizada
   */
  deleteCategory(id: number | string){
    const endpoint = `${API_URL}/categories/${id}`;
    console.log('Service - Deletando categoria. Endpoint:', endpoint);
    return this.http.delete(endpoint);
  }

  /**
   * Buscar categoria
   * @param id ID da categoria
   * @returns Categoria encontrada
   */
  getCategoryById(id: any){
    const endpoint = `${API_URL}/categories/${id}`;
    console.log('Service - Buscando categoria. Endpoint:', endpoint);
    return this.http.get(endpoint);
  }

}
