import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  
  public categoryForm!: FormGroup;
  estadoFormulario: string = "";
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private categoryService = inject(CategoryService);
  public data =  inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
    
    console.log('Data recebida:', this.data);
    this.estadoFormulario = "Criar";
    
    if (this.data !== null && this.data.id) {
      this.updateForm(this.data);
      this.estadoFormulario = "Atualizar";
    }
  }
 
  onCancel() {
    // Handle cancel action
    this.dialogRef.close(3);
  }
  onSave() {
    // Validate form before saving
    if (this.categoryForm.invalid) {
      console.error('Formulário inválido');
      return;
    }

    // Handle save action
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };
    
    if (this.data !== null && this.data.id) {
      // update registry
      console.log('Atualizando categoria com ID:', this.data.id, 'Dados:', data);
      this.categoryService.updateCategory(data, this.data.id)
      .subscribe((response: any) => {
        console.log('Categoria atualizada com sucesso:', response);
        this.dialogRef.close(1);
      }, (error : any) => {
        console.error('Erro ao atualizar categoria:', error);
        console.error('Status:', error.status);
        console.error('Mensagem:', error.message);
        if (error.error && error.error.message) {
          console.error('Erro do servidor:', error.error.message);
        }
        this.dialogRef.close(2);
      });
    } else {
      // create new registry
      console.log('Criando nova categoria:', data);
      this.categoryService.saveCategory(data)
      .subscribe((response: any) => {
        console.log('Categoria salva com sucesso:', response);
        this.dialogRef.close(1);
      }, (error : any) => {
        console.error('Erro ao salvar categoria:', error);
        console.error('Status:', error.status);
        console.error('Mensagem:', error.message);
        if (error.error && error.error.message) {
          console.error('Erro do servidor:', error.error.message);
        }
        this.dialogRef.close(2);
      });
    }
  }
   updateForm(data: any) {
    if (data && data.name && data.description) {
      this.categoryForm.patchValue({
        name: data.name,
        description: data.description
      });
    } else {
      console.error('Dados inválidos para atualizar o formulário:', data);
    }
  }

}
