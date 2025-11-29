export interface ShoppingCartHeader {
  cartHeaderId : number;
  userId?: string;
  couponCode?: string;
  discount: number;
  cartTotal: number;
  name? : string;
  phone? : string;
  email? : string;
}

