import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  customer_id!: number;

  @Column('int')
  order_no!: number;

  @Column('varchar', { length: 255 })
  product_name!: string;

  @Column('int')
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount!: number;

  @Column('enum', { enum: ['pending', 'paid', 'cancelled'] })
  status!: 'pending' | 'paid' | 'cancelled';

  @Column('timestamp')
  created_at!: Date;

  @Column('timestamp')
  updated_at!: Date;
}
