import { Button } from "../../ui/button"

export default function ButtonColors() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="contrast">Contrast</Button>
    </div>
  )
}
