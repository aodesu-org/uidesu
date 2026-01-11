import { Button } from "../../ui/button"

export default function ButtonOutlined() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="neutral">
        Neutral
      </Button>
    </div>
  )
}
