import { OrderHeader } from "./OrderHeader";
import { OrderDetail } from "./OrderDetail";

export class StripeRequest {
	approvedUrl: string = "";
	cancelUrl: string = "";
	orderHeader : OrderHeader | null = null;
  }
  
  