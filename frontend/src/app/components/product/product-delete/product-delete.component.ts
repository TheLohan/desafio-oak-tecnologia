import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: null,
    isAvaliable: null,
  };

  constructor(
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get("id");
      this.productService.readById(id!).subscribe(product => {
        this.product = product;
      });
  }

  deleteProduct(): void {
      const id = this.route.snapshot.paramMap.get("id");
      this.productService.delete(id!).subscribe(() => {
          this.productService.showMessage("Produto deletado com sucesso");
          this.router.navigate([""])
      });
  }

  cancel(): void {
      this.router.navigate([""]);
  }
}
