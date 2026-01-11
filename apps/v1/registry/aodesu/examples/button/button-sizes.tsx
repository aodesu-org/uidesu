import { Button } from "../../ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="contained" size="small">Small</Button>
      <Button variant="contained" size="medium">Medium</Button>
      <Button variant="contained" size="big">Big</Button>
    </div>
  )
}
