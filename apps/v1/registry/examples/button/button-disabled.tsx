import Button from "@/registry/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button disabled>Deshabilitado</Button>
      <Button variant="contained" color="primary" disabled>
        Deshabilitado
      </Button>
      <Button variant="outlined" disabled>
        Deshabilitado
      </Button>
      <Button variant="text" disabled>
        Deshabilitado
      </Button>
    </div>
  )
}
