import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1775818193791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL PRIMARY KEY,
                "customer_id" INT NOT NULL,
                "order_no" INT NOT NULL,
                "product_name" VARCHAR(255) NOT NULL,
                "quantity" INT NOT NULL,
                "price" DECIMAL(10, 2) NOT NULL,
                "total_amount" DECIMAL(10, 2) NOT NULL,
                "status" VARCHAR(20) CHECK (status IN ('pending', 'paid', 'cancelled')) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "orders";
        `);
    }

}
