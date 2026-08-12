"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlagIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const REPORT_REASONS = [
  { value: "contenido_inapropiado", label: "Contenido inapropiado" },
  { value: "informacion_falsa", label: "Información falsa o engañosa" },
  { value: "spam", label: "Spam o promoción no deseada" },
  { value: "otro", label: "Otro motivo" },
];

/**
 * Abre un Dialog con el motivo del reporte. Todavía NO persiste en Supabase
 * (Fase 4 es solo UI) — la forma ya coincide con createReport() de
 * src/lib/domain/social/moderation.ts para conectarse a un Server Action
 * sin rediseñar este formulario.
 */
export function ReportButton({
  postId,
  className,
}: {
  postId: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  function handleSubmit() {
    if (!reason) {
      toast.error("Elige un motivo antes de enviar el reporte");
      return;
    }

    toast.success("Reporte enviado al equipo de FeedAPet");
    setOpen(false);
    setReason(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setReason(null);
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn("text-muted-foreground", className)}
            aria-label="Reportar publicación"
            data-post-id={postId}
          />
        }
      >
        <FlagIcon className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar publicación</DialogTitle>
          <DialogDescription>
            Cuéntanos qué falla en esta publicación. El equipo de FeedAPet la
            revisará.
          </DialogDescription>
        </DialogHeader>

        <Select value={reason ?? undefined} onValueChange={setReason}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Elige un motivo" />
          </SelectTrigger>
          <SelectContent>
            {REPORT_REASONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Enviar reporte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
