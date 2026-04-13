"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";

export function OrderForm({ formId, order, customersList }: { formId: string, order?: Order, customersList?: { id: number, name: string }[] }) {
  const [ totalAmount, setTotalAmount ] = useState(0);
  const onQuantityOrPriceChange = () => {
    const quantityInput = document.getElementById("order-quantity") as HTMLInputElement;
    const priceInput = document.getElementById("order-price") as HTMLInputElement;
    const qty = Number(quantityInput?.value) || 0;
    const price = Number(priceInput?.value) || 0;

    setTotalAmount(qty * price);
  }

  useEffect(() => {
  if (order) {
    setTotalAmount(Number(order.price) * order.quantity);
  }
}, [order]);


  return (
    <FieldGroup>
      <Field>
        <FieldLabel>
          Customer
        </FieldLabel>
          <Select name="order_customer_id" form={formId} defaultValue={order ? order.customer_id.toString() : ''}>
          <SelectTrigger>
            <SelectValue placeholder="Choose customer"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              { customersList &&
                customersList.map((customer, index) => <SelectItem key={index} value={`${customer.id}`}>{customer.name}</SelectItem>)
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="order-no">
          Order No.
        </FieldLabel>
        <Input id="order-no" name="order_order_no" form={formId}  type="number" defaultValue={order ? order.order_no : Math.round(Math.random() * 900000)} readOnly required />
      </Field>
      <Field>
        <FieldLabel htmlFor="order-product">
          Product Name
        </FieldLabel>
        <Input id="order-product" name="order_product_name" form={formId}  defaultValue={order ? order.product_name : ''} maxLength={255} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="order-quantity">
          Quantity
        </FieldLabel>
        <Input id="order-quantity" name="order_quantity" form={formId}  type="number" defaultValue={order ? order.quantity : ''} onChange={onQuantityOrPriceChange} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="order-price">
          Price
        </FieldLabel>
        <Input id="order-price" name="order_price" form={formId}  type="number" defaultValue={order ? order.price : ''} onChange={onQuantityOrPriceChange} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="order-total">
          Total
        </FieldLabel>
        <Input
          id="order-total"
          type="number"
          name="order_total_amount"
          form={formId}
          value={totalAmount}
          required readOnly
        />
      </Field>
      <Field>
        <FieldLabel>
          Status
        </FieldLabel>
        <Select name="order_status" form={formId}  defaultValue={order ? order.status : ''}>
          <SelectTrigger>
            <SelectValue placeholder="Choose status"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      { order && <Input type="hidden" name="order_id" form={formId}  value={order.id} /> }
    </FieldGroup>
  );
}