import Button from "@/registry/ui/button"

export default function ButtonContained() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="neutral">
        Neutral
      </Button>
    </div>
  )
}
