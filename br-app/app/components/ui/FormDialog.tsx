"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useActionState } from "react";
import { LoadingOverlay } from "./LoadingOverlay";

interface AppDialogProps {
  title: string;
  triggerText: string;
  formId: string;
  formAction: (state: any, formData: FormData) => any;
  triggerVariant?: 'default' | 'secondary' | 'destructive';
  triggerSize?: 'sm' | 'lg' | 'default';
  confirmButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
}

interface FormDialogState {
  success: boolean,
  message: string,
  errors?: string[],
}

export function FormDialog({ title, triggerText, formId, formAction, triggerVariant, triggerSize, confirmButtonText, cancelButtonText, children }: AppDialogProps) {
  const [state, action, isPending] = useActionState(formAction, { success: false, message: '' } as FormDialogState)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant || 'default'} size={triggerSize || 'default'}>{triggerText}</Button>
      </DialogTrigger>
      <form action={action} id={formId}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          { !state.success && <div className="text-red-400">{state.message}</div> }
          <LoadingOverlay isVisible={isPending} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {cancelButtonText || "Close"}
              </Button>
            </DialogClose>
            <Button type="submit" form={formId}>
              {confirmButtonText || "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}