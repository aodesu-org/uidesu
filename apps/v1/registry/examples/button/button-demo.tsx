import Button from "@/registry/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6">
      <Button variant="ghost" color="contrast">
        Botón
      </Button>

      <Button variant="contained" color="primary">
        Botón
      </Button>

      <Button variant="outlined" color="secondary">
        Botón
      </Button>

      <Button variant="text">Botón</Button>
    </div>
  )
}
