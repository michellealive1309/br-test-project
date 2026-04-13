import { Order } from "../entities/order.entity";

export class OrderResponseDto {
  id: number;
  customer_id: number;
  order_no: number;
  product_name: string;
  quantity: number;
  price: number;
  total_amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    customer_id: number,
    order_no: number,
    product_name: string,
    quantity: number,
    price: number,
    total_amount: number,
    status: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.customer_id = customer_id;
    this.order_no = order_no;
    this.product_name = product_name;
    this.quantity = quantity;
    this.price = price;
    this.total_amount = total_amount;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static toDto(entity: Order): OrderResponseDto {
    return new OrderResponseDto(
      entity.id,
      entity.customer_id,
      entity.order_no,
      entity.product_name,
      entity.quantity,
      entity.price,
      entity.total_amount,
      entity.status,
      entity.created_at,
      entity.updated_at
    );
  }
}