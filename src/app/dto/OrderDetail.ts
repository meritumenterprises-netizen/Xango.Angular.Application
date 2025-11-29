import { Product } from "./Product";

export interface OrderDetail {
	orderDetailsId: number;
	orderHeaderId: number;
	productId: number;
	product?: Product;
	price: number;
  }
  
  