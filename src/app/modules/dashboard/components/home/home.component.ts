import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  charBar: any;
  charDoughnut: any;
  private productService = inject(ProductService);

  ngOnInit(): void {
    // Initialization logic here
    this.getProducts();
  }
  getProducts(): void {
        this.productService.getProducts()
        // Lógica para obter produtos
        .subscribe((data:any) => {
          console.log("Resposta produtos",data);
          this.processProductResponse(data);
      }, (error) => {
          console.error("Erro ao obter produtos", error);
      });
    }
    processProductResponse(resp: any){
      const nameProduct: string[] = [];
      const account: number[] = [];

      if(resp && resp.metadata && resp.metadata[0] && resp.metadata[0].code == "00"){
        let listProduct = resp.productResponse.products;
        listProduct.forEach((element: ProductElement) => {
          nameProduct.push(element.name);
          account.push(element.account);
        });

        // Paleta de cores (mesmas cores do exemplo)
        const paletteBackground = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ];
        const paletteBorder = [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ];

        // Gerar arrays de cores correspondentes ao número de produtos (repetindo se necessário)
        const backgroundColor = nameProduct.map((_, i) => paletteBackground[i % paletteBackground.length]);
        const borderColor = nameProduct.map((_, i) => paletteBorder[i % paletteBorder.length]);

        // Destruir gráfico anterior se existir (evita sobreposição)
        if (this.charBar) {
          this.charBar.destroy();
        }

        // Configurar o gráfico com o estilo desejado
        this.charBar = new Chart("canvas-bar", {
          type: 'bar',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: "Produtos",
                data: account,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // mostrar grafico em doughnut
        this.charDoughnut = new Chart("canvas-doughnut", {
          type: 'doughnut',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: "Produtos",
                data: account,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            }
          }
        });
      }
    }

}
