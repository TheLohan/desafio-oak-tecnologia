import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductsData } from '../productData.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {

	productsData: ProductsData = {
    products: [],
    count: 0,
    limit: 0
  }


  products: Product[] = []
	displayedColumns: string[] = ['name', 'price', 'action']

	constructor(
			private productService: ProductService
	){}

	ngOnInit(): void{
			this.productService.read().subscribe(data => {
          this.productsData = data
          this.products = this.productsData.products
          console.log(this.products)
			})
	}

}
