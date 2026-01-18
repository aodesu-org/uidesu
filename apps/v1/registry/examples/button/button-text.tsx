import Button from "@/registry/ui/button"

export default function ButtonText() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="text" color="primary">
        Text
      </Button>
      <Button variant="text" color="secondary">
        Secondary
      </Button>
      <Button variant="text" color="neutral">
        Neutral
      </Button>
    </div>
  )
}
