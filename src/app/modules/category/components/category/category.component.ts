import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {


  isAdmin: any;

  private categoryService = inject(CategoryService);

  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private utilService = inject(UtilService);

  ngOnInit(): void {
    this.getCategories();
    this.isAdmin = this.utilService.isAdmin();
    console.log("isAdmin:", this.isAdmin);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild('paginator') paginator!: MatPaginator;

  getCategories(): void {

    this.categoryService.getCategories()
      .subscribe((data:any) => {

        console.log("Resposta categorias",data);

        this.processsCategoriesResponse(data);
      }, (error) => {
        console.error("Erro ao obter categorias", error);
        // Inicializar dataSource vazio em caso de erro
        this.dataSource = new MatTableDataSource<CategoryElement>([]);
      })
  }

  processsCategoriesResponse(resp: any){
    const datacategory: CategoryElement[] = [];

    if(resp && resp.metadata && resp.metadata[0] && resp.metadata[0].code == "00"){

      // Estrutura correta: resp.categoryResponse.categorys
      if(resp.categoryResponse && resp.categoryResponse.categorys && Array.isArray(resp.categoryResponse.categorys)){
        let listCategory = resp.categoryResponse.categorys;
        
        listCategory.forEach((element: CategoryElement) => {
          datacategory.push(element);
        });
        
        console.log("Categorias carregadas com sucesso:", datacategory.length, "itens");
      } else {
        console.warn("Estrutura de categorias não encontrada. Propriedades disponíveis:", Object.keys(resp));
      }
      
      this.dataSource.data = datacategory;
    } else {
      console.error("Erro na resposta do servidor ou código diferente de '00':", resp);
      this.dataSource = new MatTableDataSource<CategoryElement>([]);
    }
  }
  openCategoryDialog(enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Categoria criada com sucesso!', 'OK');
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar('Erro ao criar categoria.', 'Error');
      }

    });
  }

  edit(id: number,name: string,description: string, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: { id: id, name: name, description: description },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Categoria atualizada com sucesso!', 'OK');
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar('Erro ao atualizar categoria.', 'Error');
      }

    });
  }
  delete(id: number, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id,  module: 'category' },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Categoria excluída com sucesso!', 'OK');
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar('Erro ao excluir categoria.', 'Error');
      }

    });
  }
  buscar(termino: string) {
      if (termino) {
          const filterValue = termino.trim().toLowerCase();
          this.dataSource.filter = filterValue;
      } else {
          this.dataSource.filter = '';
      }
  }
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  // export execel
  exportExcel(){
    this.categoryService.exportCategories()
      .subscribe((data: any) => {
        let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let fileUrl = window.URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'categorias.xlsx';
        anchor.href = fileUrl;
        anchor.click();

        this.openSnackBar('Categorias exportadas com sucesso!', 'OK');
        // window.URL.revokeObjectURL(fileUrl);
      }, (error: any) => {
        console.error("Erro ao exportar categorias", error);
        this.openSnackBar('Erro ao exportar categorias.', 'Error');
      });
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}