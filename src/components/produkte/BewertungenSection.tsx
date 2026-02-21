"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Bewertung {
  id: string
  produkt_id: string
  sterne: number
  text: string | null
  name: string | null
  email: string | null
  created_at: string
}

interface BewertungenResponse {
  bewertungen: Bewertung[]
  durchschnitt: number
  anzahl: number
}

interface Props {
  produktSlug: string
}

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  interactive?: boolean
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          className={cn(
            "transition-colors",
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          )}
        >
          <Star
            className={cn(
              "h-5 w-5",
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-transparent text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function BewertungenSection({ produktSlug }: Props) {
  const [data, setData] = useState<BewertungenResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchBewertungen = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/bewertungen?produkt_id=${produktSlug}`)
      if (!res.ok) throw new Error("Fehler beim Laden")
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError("Bewertungen konnten nicht geladen werden")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBewertungen()
  }, [produktSlug])

  const handleBewertungAdded = () => {
    setShowForm(false)
    fetchBewertungen()
  }

  if (loading) {
    return (
      <div className="mt-16 pt-16 border-t">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-48" />
          <div className="h-20" />
         bg-muted rounded</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-16 pt-16 border-t">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  const { bewertungen, durchschnitt, anzahl } = data || {
    bewertungen: [],
    durchschnitt: 0,
    anzahl: 0,
  }

  return (
    <div className="mt-16 pt-16 border-t">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl font-light tracking-wide">
            Kundenbewertungen
          </h2>
          {anzahl > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={Math.round(durchschnitt)} />
              <span className="text-sm text-muted-foreground">
                {durchschnitt.toFixed(1)} von 5 ({anzahl} {anzahl === 1 ? "Bewertung" : "Bewertungen"})
              </span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowForm(!showForm)}
          className="rounded-none uppercase text-xs tracking-wider"
        >
          {showForm ? "Abbrechen" : "Bewertung schreiben"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <BewertungFormular
          produktSlug={produktSlug}
          onSuccess={handleBewertungAdded}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Empty State */}
      {anzahl === 0 && !showForm && (
        <div className="text-center py-12 bg-secondary/20 rounded-lg">
          <Star className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            Noch keine Bewertungen für dieses Produkt.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Sei der Erste und teile deine Erfahrungen!
          </p>
        </div>
      )}

      {/* Bewertungen List */}
      {bewertungen.length > 0 && (
        <div className="space-y-6">
          {bewertungen.map((bewertung) => (
            <Card key={bewertung.id} className="p-6 rounded-none border-border/60">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <StarRating rating={bewertung.sterne} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {bewertung.name || "Anonym"} • {formatDate(bewertung.created_at)}
                  </p>
                </div>
              </div>
              {bewertung.text && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {bewertung.text}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function BewertungFormular({
  produktSlug,
  onSuccess,
  onCancel,
}: {
  produktSlug: string
  onSuccess: () => void
  onCancel: () => void
}) {
  const [sterne, setSterne] = useState(0)
  const [text, setText] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (sterne === 0) {
      setError("Bitte wähle eine Bewertung (Sterne)")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/bewertungen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produkt_id: produktSlug,
          sterne,
          text: text || null,
          name: name || null,
          email: email || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Fehler beim Speichern")
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 rounded-none border-accent/30 bg-accent/5 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sterne */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Ihre Bewertung *
          </label>
          <StarRating
            rating={sterne}
            onRatingChange={setSterne}
            interactive
          />
        </div>

        {/* Text */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Ihr Erfahrungsbericht (optional)
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Teilen Sie Ihre Erfahrungen mit diesem Produkt..."
            maxLength={1000}
            rows={4}
            className="rounded-none resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {text.length}/1000 Zeichen
          </p>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Ihr Name (optional)
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
              maxLength={100}
              className="rounded-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              E-Mail (optional, wird nicht angezeigt)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="max@example.de"
              className="rounded-none"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="rounded-none uppercase text-xs tracking-wider"
          >
            {loading ? "Wird gespeichert..." : "Bewertung absenden"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-none uppercase text-xs tracking-wider"
          >
            Abbrechen
          </Button>
        </div>
      </form>
    </Card>
  )
}
