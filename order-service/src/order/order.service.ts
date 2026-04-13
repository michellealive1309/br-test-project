import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { PaginateResponseDto } from '../dto/paginate-response.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { catchError, firstValueFrom } from 'rxjs';
import { Customer } from '../types/customer';
import { AxiosError } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly httpService: HttpService
  ) {}

  async create(createOrderDto: CreateOrderDto, token: string): Promise<OrderResponseDto> {
    if (!(await this.validateCustomerExists(createOrderDto.customer_id, token))) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    const totalAmount = this.calculateTotalAmount(createOrderDto.price, createOrderDto.quantity);
    createOrderDto.total_amount = createOrderDto.total_amount === totalAmount ? createOrderDto.total_amount : totalAmount;

    const order = this.orderRepository.create(createOrderDto);
    const now = new Date();
    order.created_at = now;
    order.updated_at = now;
    await this.orderRepository.save(order);

    return OrderResponseDto.toDto(order);
  }

  async findByPaginate(page: number = 1, limit: number = 10): Promise<PaginateResponseDto<OrderResponseDto[]>> {
    const skip = (page - 1) * limit;
    const [orders, total] = await this.orderRepository.findAndCount({
      skip,
      take: limit,
    });

    return new PaginateResponseDto<OrderResponseDto[]>(
      orders.map(order => OrderResponseDto.toDto(order)),
      page,
      limit,
      total
    );
  }

  async findOne(id: number): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return OrderResponseDto.toDto(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, token: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (
      updateOrderDto.customer_id &&
      (order.customer_id !== updateOrderDto.customer_id
        || !(await this.validateCustomerExists(updateOrderDto.customer_id, token)))
    ) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    if (updateOrderDto.price !== undefined || updateOrderDto.quantity !== undefined) {
      const price = updateOrderDto.price !== undefined ? updateOrderDto.price : order.price;
      const quantity = updateOrderDto.quantity !== undefined ? updateOrderDto.quantity : order.quantity;
      updateOrderDto.total_amount = this.calculateTotalAmount(price, quantity);
    }

    Object.assign(order, updateOrderDto);
    const updatedOrder = await this.orderRepository.save(order);

    return OrderResponseDto.toDto(updatedOrder);
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const removedOrder = await this.orderRepository.remove(order);

    return OrderResponseDto.toDto(removedOrder);
  }

  private calculateTotalAmount(price: number, quantity: number): number {
    return price * quantity;
  }

  private async validateCustomerExists(customer_id: number, token: string): Promise<boolean> {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await firstValueFrom(
      this.httpService.get<Customer>(`/api/customers/${customer_id}`, config).pipe(
        catchError((error: AxiosError) => {
          if (error.response?.status !== 404) {
            throw new HttpException('Failed to validate customer: Customer service unavailable', HttpStatus.SERVICE_UNAVAILABLE);
          }

          throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        })
      )
    );

    if (!data || data.id !== customer_id) {
      return false;
    }
    
    return true;
  }
}
