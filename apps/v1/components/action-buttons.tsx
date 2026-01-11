import { Button } from "@/registry/aodesu/ui/button";
import { AtSign, Copy, Send } from "lucide-react";

export default function ActionButtons({ code }: { code: string }) {
  return (
    <div>
      <Button size="small" title="Enviar por correo">
        <AtSign />
      </Button>
      <Button size="small" title="Compartir">
        <Send />
      </Button>
      <Button size="small" title="Copiar">
        <Copy />
      </Button>
    </div>
  )
}
