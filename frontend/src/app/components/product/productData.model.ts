import { Product } from "./product.model";

export interface ProductsData{
  products: Product[],
  count: number,
  limit: number
}
