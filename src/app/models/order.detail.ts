import { Product } from "./product.model";

export interface OrderDetailResponse {
  id: number;
  product: Product;
  number_of_products: number;
  price: number;
  total_money: number;
  color: string;
}
    