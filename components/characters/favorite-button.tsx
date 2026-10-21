"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({ characterId }: { characterId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(characterId);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(event) => {
        event.preventDefault();
        toggleFavorite(characterId);
      }}
    >
      <Heart className={cn(active && "fill-destructive text-destructive")} />
    </Button>
  );
}
