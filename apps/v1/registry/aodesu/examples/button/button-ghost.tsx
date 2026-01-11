import { Button } from "../../ui/button"

export default function ButtonGhost() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="ghost" color="primary">
        Primary
      </Button>
      <Button variant="ghost" color="secondary">
        Secondary
      </Button>
      <Button variant="ghost" color="neutral">
        Neutral
      </Button>
    </div>
  )
}
