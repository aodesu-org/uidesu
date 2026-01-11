import { Loader2 } from "lucide-react"
import { Button } from "../../ui/button"

export default function ButtonLoading() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button disabled>
        <Loader2 className="animate-spin" />
        Cargando...
      </Button>
      <Button variant="contained" color="primary" disabled>
        <Loader2 className="animate-spin" />
        Procesando...
      </Button>
      <Button variant="outlined" disabled>
        <Loader2 className="animate-spin" />
        Guardando...
      </Button>
    </div>
  )
}
