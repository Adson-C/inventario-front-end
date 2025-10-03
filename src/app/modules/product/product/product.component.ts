import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  private productService = inject(ProductService);

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
        element.category = element.category ? element.category.name : '';
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
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
