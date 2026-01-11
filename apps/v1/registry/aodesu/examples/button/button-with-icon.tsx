import { Download, Plus, Send, Upload } from "lucide-react"
import { Button } from "../../ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="contained">
        <Send />
        Enviar
      </Button>
      <Button variant="outlined" color="primary">
        <Download />
        Descargar
      </Button>
      <Button variant="ghost" color="secondary">
        <Upload />
        Subir
      </Button>
      <Button variant="contained" color="primary">
        <Plus />
        Crear
      </Button>
    </div>
  )
}
