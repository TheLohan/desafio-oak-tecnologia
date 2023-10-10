import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { EMPTY, Observable, catchError, map } from "rxjs";
import { ProductsData } from './productData.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:4000/products'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
}

  read(): Observable<ProductsData> {
      return this.http.get<ProductsData>(this.baseUrl);
  }

  readById(id: string): Observable<Product> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
      const url = `${this.baseUrl}/${product._id}`;
      return this.http.put<Product>(url, product);
  }

  delete(id: string): Observable<Product> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<Product>(url);
  }

}
