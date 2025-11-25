import Avatar from "@/registry/aodesu/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6">
      <Avatar
        src="https://github.com/sergiocortes-dll.png"
      />

      <Avatar
        src="https://github.com/colp-code.png"
        className="rounded-lg"
      />
    </div>
  )
}
