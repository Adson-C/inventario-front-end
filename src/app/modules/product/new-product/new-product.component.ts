import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';

export interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private categoryService = inject(CategoryService);
  public productForm!: FormGroup;

  estadoFormulario: string = "";
  categories: Category[] = [];
  selectedFile: any;
  nameImg: string = "";
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<NewProductComponent>);
  private productService = inject(ProductService);
  private data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
       this.productForm = this.fb.group({
        name: ['', Validators.required], 
        price: ['', Validators.required],
        account: ['', Validators.required],
        category: ['', Validators.required]
      });
      this.estadoFormulario = "Criar";
      this.getCategories();
      
      if (this.data != null && this.data != undefined) {
        this.populateProductForm(this.data);
        this.estadoFormulario = "Atualizar";
      }
    }
    
onCancel() {
    // Handle cancel action
    this.dialogRef.close(3);
  }
  onSave() {
    // Validate form before saving
    if (this.productForm.invalid) {
      console.error('Formulário inválido');
      return;
    }

    // Verificar se uma imagem foi selecionada
    if (!this.selectedFile) {
      console.error('Nenhuma imagem selecionada');
      return;
    }

    // Handle save action
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    console.log('Dados do formulário:', data);
    const uploadImageData = new FormData();
    uploadImageData.append('picture', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);

    if (this.data != null) {
       // sair da função após a atualização
       this.productService.updateProduct(uploadImageData, this.data.id)
          .subscribe((data: any) => {
              console.log('Produto salvo com sucesso:', data);
              this.dialogRef.close(1);
            }, (error: any) => {
              console.error('Erro ao salvar produto:', error);
              console.error('Status:', error.status);
              console.error('Mensagem:', error.message);
              if (error.error && error.error.message) {
                console.error('Erro do servidor:', error.error.message);
              }
              this.dialogRef.close(2);
            });
    } else {
      this.productService.saveProduct(uploadImageData)
        .subscribe((data: any) => {
          console.log('Produto salvo com sucesso:', data);
          this.dialogRef.close(1);
        }, (error: any) => {
          console.error('Erro ao salvar produto:', error);
          console.error('Status:', error.status);
          console.error('Mensagem:', error.message);
          if (error.error && error.error.message) {
            console.error('Erro do servidor:', error.error.message);
          }
          this.dialogRef.close(2);
        });
    }
  }

  getCategories() {
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      console.log('Resposta completa das categorias:', data);
      
      // Verificar se a resposta tem a estrutura correta
      if (data && data.metadata && data.metadata[0] && data.metadata[0].code === "00") {
        if (data.categoryResponse && data.categoryResponse.categorys) {
          this.categories = data.categoryResponse.categorys;
          console.log('Categorias carregadas:', this.categories);
        } else {
          console.warn('Estrutura de categorias não encontrada na resposta');
          this.categories = [];
        }
      } else {
        console.error('Erro na resposta da API ou código diferente de 00');
        this.categories = [];
      }
    }, (error) => {
      console.error('Erro ao obter categorias:', error);
      this.categories = [];
    });
  }

  private populateProductForm(data: any) {
    if (data && data.name && data.price && data.account && data.category) {
      this.productForm.patchValue({
        name: data.name,
        price: data.price,
        account: data.account,
        category: data.category.id // Assuming category is an object with an id property
      });
      this.nameImg = data.picture; // Assuming picture is a URL or base64 string
    } else {
      console.error('Dados inválidos para atualizar o formulário:', data);
    }
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Arquivo selecionado:', this.selectedFile);
    this.nameImg = event.target.files[0].name;
  }
}