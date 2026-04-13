"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Customer } from "@/types/customer";

export function CustomerForm({ formId, customer }: { formId: string, customer?: Customer }) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="customer-name">
          Name
        </FieldLabel>
        <Input id="customer-name" name="customer_name" form={formId} defaultValue={customer ? customer.name : ''} maxLength={255} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="customer-email">
          Email
        </FieldLabel>
        <Input id="customer-eamil" name="customer_email" form={formId} type="email" defaultValue={customer ? customer.email : ''} maxLength={255} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="customer-phone">
          Phone number
        </FieldLabel>
        <Input
          id="customer-phone"
          name="customer_phone"
          form={formId} defaultValue={customer ? customer.phone : ''}
          pattern="[0-9]*"
          title="Please enter number only"
          inputMode="numeric"
          required
        />
      </Field>
      { customer && <Input type="hidden" name="customer_id" form={formId} value={customer.id}></Input> }
    </FieldGroup>
  );
}