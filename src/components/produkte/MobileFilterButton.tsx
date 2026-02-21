"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterLeiste } from "./FilterLeiste"
import type { FilterParams } from "@/types/product"

interface MobileFilterButtonProps {
  filters: FilterParams
}

export function MobileFilterButton({ filters }: MobileFilterButtonProps) {
  const [open, setOpen] = useState(false)

  const activeCount =
    (filters.material?.length ?? 0) +
    (filters.kategorie?.length ?? 0) +
    (filters.preis ? 1 : 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 rounded-none"
          aria-label="Filter öffnen"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-medium">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-serif font-light tracking-wide text-left text-xl">
            Filter
          </SheetTitle>
        </SheetHeader>
        <FilterLeiste filters={filters} />
      </SheetContent>
    </Sheet>
  )
}
