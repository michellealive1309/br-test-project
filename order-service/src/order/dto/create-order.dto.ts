import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Customer Id", type: "integer" })
  customer_id!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Order number", type: "integer" })
  order_no!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Product name", type: "string" })
  product_name!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Quantity", type: "number" })
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Price", type: "number" })
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Total Amount", type: "number" })
  total_amount!: number;

  @IsEnum(['pending', 'paid', 'cancelled'])
  @IsNotEmpty()
  @ApiProperty({ description: "Status", enum: ["pending", "paid", "cancelled"] })
  status!: 'pending' | 'paid' | 'cancelled';
}
