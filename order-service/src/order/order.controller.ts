import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Query, Headers, HttpCode, HttpStatus, Put, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiHeaders } from '@nestjs/swagger';
import type { Request } from 'express';

@Controller('api/orders')
@UseGuards(AuthGuard)
@ApiBearerAuth('token')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1] ?? '';
    return this.orderService.create(createOrderDto, token);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page', ParseIntPipe) page: number = 1, @Query('limit', ParseIntPipe) limit: number = 10) {
    return this.orderService.findByPaginate(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto, @Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1] ?? '';
    return this.orderService.update(id, updateOrderDto, token);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe  ) id: number) {
    return this.orderService.remove(id);
  }
}
