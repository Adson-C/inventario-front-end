import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
    public dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }
   ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
    dataSource = new MatTableDataSource<ProductElement>();
  
    @ViewChild('paginator') paginator!: MatPaginator;

    getProducts(): void {
      this.productService.getProducts()
      // Lógica para obter produtos
      .subscribe((data:any) => {
        console.log("Resposta produtos",data);
        this.processProductResponse(data);
    }, (error) => {
        console.error("Erro ao obter produtos", error);
        this.dataSource = new MatTableDataSource<ProductElement>([]);
    });
  }
  processProductResponse(resp: any){
    const dataProduct: ProductElement[] = [];

    if(resp && resp.metadata && resp.metadata[0] && resp.metadata[0].code == "00"){
      let listProduct = resp.productResponse.products;
      listProduct.forEach((element: ProductElement) => {
        // element.category = element.category ? element.category.name : '';
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }
  openProductDialog(enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Produto criado com sucesso!', 'OK');
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar('Erro ao criar produto.', 'Error');
      }

    });
  }
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
      return this.snackBar.open(message, action, {
        duration: 3000,
      });
    }
  delete(id: number, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
     const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {id: id, module: 'product'},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Produto deletado com sucesso!', 'OK');
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar('Erro ao deletar produto.', 'Error');
      }

    });
}
edit(id:number, name:string, price:number, account:number, category:any, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms') {
  const dialogRef = this.dialog.open(NewProductComponent, {
      width: '350px',
      data: {id: id, name: name, price: price, account: account, category: category},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if ( result == 1){
        this.openSnackBar('Produto editado com sucesso!', 'OK');
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar('Erro ao editar produto.', 'Error');
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
}
export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: any;
  category: any;
  picture: any;
}
