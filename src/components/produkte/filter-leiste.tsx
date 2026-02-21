"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MATERIALS,
  KATEGORIEN,
  PREISBEREICHE,
  SORTIERUNGEN,
  type Material,
  type Kategorie,
  type Preisbereich,
  type Sortierung,
  type FilterParams,
} from "@/lib/products";

interface FilterLeisteProps {
  currentFilters: FilterParams;
}

export function FilterLeiste({ currentFilters }: FilterLeisteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = useCallback(
    (updates: Partial<FilterParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.material !== undefined) {
        if (updates.material.length > 0) {
          params.set("material", updates.material.join(","));
        } else {
          params.delete("material");
        }
      }

      if (updates.kategorie !== undefined) {
        if (updates.kategorie.length > 0) {
          params.set("kategorie", updates.kategorie.join(","));
        } else {
          params.delete("kategorie");
        }
      }

      if (updates.preis !== undefined) {
        if (updates.preis) {
          params.set("preis", updates.preis);
        } else {
          params.delete("preis");
        }
      }

      if (updates.sort !== undefined) {
        if (updates.sort !== "neueste") {
          params.set("sort", updates.sort);
        } else {
          params.delete("sort");
        }
      }

      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const toggleMaterial = useCallback(
    (value: Material) => {
      const current = [...currentFilters.material];
      const idx = current.indexOf(value);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(value);
      }
      updateUrl({ material: current });
    },
    [currentFilters.material, updateUrl]
  );

  const toggleKategorie = useCallback(
    (value: Kategorie) => {
      const current = [...currentFilters.kategorie];
      const idx = current.indexOf(value);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(value);
      }
      updateUrl({ kategorie: current });
    },
    [currentFilters.kategorie, updateUrl]
  );

  const setPreis = useCallback(
    (value: string) => {
      // If clicking the already-selected value, deselect it
      if (value === currentFilters.preis) {
        updateUrl({ preis: null });
      } else {
        updateUrl({ preis: value as Preisbereich });
      }
    },
    [currentFilters.preis, updateUrl]
  );

  const setSort = useCallback(
    (value: string) => {
      updateUrl({ sort: value as Sortierung });
    },
    [updateUrl]
  );

  return (
    <aside
      className="space-y-6"
      role="complementary"
      aria-label="Produktfilter"
    >
      {/* Sortierung */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-3">
          Sortierung
        </h3>
        <Select value={currentFilters.sort} onValueChange={setSort}>
          <SelectTrigger
            className="w-full text-sm"
            aria-label="Sortierung auswählen"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTIERUNGEN.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Material Filter */}
      <fieldset>
        <legend className="text-xs font-medium tracking-widest uppercase text-foreground mb-3">
          Material
        </legend>
        <div className="space-y-2.5">
          {MATERIALS.map((m) => (
            <div key={m.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`material-${m.value}`}
                checked={currentFilters.material.includes(m.value)}
                onCheckedChange={() => toggleMaterial(m.value)}
                aria-label={`Material ${m.label} filtern`}
              />
              <Label
                htmlFor={`material-${m.value}`}
                className="text-sm font-normal text-foreground cursor-pointer"
              >
                {m.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      {/* Kategorie Filter */}
      <fieldset>
        <legend className="text-xs font-medium tracking-widest uppercase text-foreground mb-3">
          Kategorie
        </legend>
        <div className="space-y-2.5">
          {KATEGORIEN.map((k) => (
            <div key={k.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`kategorie-${k.value}`}
                checked={currentFilters.kategorie.includes(k.value)}
                onCheckedChange={() => toggleKategorie(k.value)}
                aria-label={`Kategorie ${k.label} filtern`}
              />
              <Label
                htmlFor={`kategorie-${k.value}`}
                className="text-sm font-normal text-foreground cursor-pointer"
              >
                {k.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      {/* Preis Filter */}
      <fieldset>
        <legend className="text-xs font-medium tracking-widest uppercase text-foreground mb-3">
          Preisbereich
        </legend>
        <RadioGroup
          value={currentFilters.preis ?? ""}
          onValueChange={setPreis}
          aria-label="Preisbereich auswählen"
        >
          {PREISBEREICHE.map((p) => (
            <div key={p.value} className="flex items-center gap-2.5">
              <RadioGroupItem
                value={p.value}
                id={`preis-${p.value}`}
              />
              <Label
                htmlFor={`preis-${p.value}`}
                className="text-sm font-normal text-foreground cursor-pointer"
              >
                {p.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>
    </aside>
  );
}
