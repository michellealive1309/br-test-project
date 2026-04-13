export type Order = {
  id: number;
  customer_id: number;
  order_no: number;
  product_name: string;
  quantity: number;
  price: string;
  total_amount: string;
  status: 'pending' | 'paid' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}