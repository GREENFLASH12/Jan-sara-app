interface ProduktSeiteHeaderProps {
  count: number;
}

export function ProduktSeiteHeader({ count }: ProduktSeiteHeaderProps) {
  return (
    <div className="mb-6 lg:mb-8">
      <h1 className="font-serif text-3xl font-light tracking-wide sm:text-4xl">
        Unsere Produkte
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {count === 0
          ? "Keine Produkte gefunden"
          : count === 1
            ? "1 Produkt"
            : `${count} Produkte`}
      </p>
    </div>
  );
}
