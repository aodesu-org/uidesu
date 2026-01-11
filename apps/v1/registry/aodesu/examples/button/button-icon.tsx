import { Bell, Bookmark, Heart, Search, Settings, Share } from "lucide-react"
import { Button } from "../../ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Button icon variant="ghost">
        <Heart />
      </Button>
      <Button icon variant="contained" color="primary">
        <Share />
      </Button>
      <Button icon variant="outlined" color="secondary">
        <Bookmark />
      </Button>
      <Button icon variant="ghost" color="primary">
        <Bell />
      </Button>
      <Button icon variant="contained" color="secondary">
        <Settings />
      </Button>
      <Button icon variant="outlined">
        <Search />
      </Button>
    </div>
  )
}
