import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/order/entities/order.entity.ts'],
    migrations: ['src/db-migration/*.ts'],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all',
});