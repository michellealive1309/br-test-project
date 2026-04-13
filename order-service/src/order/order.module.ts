import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT') || 5000,
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS') || 5,
        baseURL: configService.get('CUSTOMER_SERVICE_URL') || 'http://localhost:8000',
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    AuthGuard,
  ],
})
export class OrderModule {}
