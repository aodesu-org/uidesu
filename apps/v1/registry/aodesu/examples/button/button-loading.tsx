"use client"

import React from "react"

import { Button } from "../../ui/button"

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState<boolean>(false)
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full border-b border-b-[hsl(var(--border))] pb-4">
        <Button
          onClick={() => setLoading(!loading)}
          variant="outlined"
          fullWidth
        >
          {loading ? "Desactivar" : "Activar"}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button loading={loading}>Botón 1</Button>
        <Button variant="contained" color="primary" loading={loading}>
          Botón 2
        </Button>
        <Button variant="outlined" loading={loading}>
          Botón 3
        </Button>
      </div>
    </div>
  )
}
