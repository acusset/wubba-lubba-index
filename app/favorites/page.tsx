"use client";

import useSWR from "swr";
import Link from "next/link";
import { CharacterCard } from "@/components/characters/character-card";
import { CharactersGridSkeleton } from "@/components/characters/characters-grid-skeleton";
import { useFavorites } from "@/hooks/use-favorites";
import { getCharactersByIds } from "@/lib/rickandmorty/api";

export default function FavoritesPage() {
  const { ids } = useFavorites();

  const { data, isLoading } = useSWR(
    ids.length > 0 ? ["favorite-characters", ids] : null,
    ([, favoriteIds]) => getCharactersByIds(favoriteIds),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">Favorites</h1>
        <p className="text-muted-foreground text-sm">
          Characters you&apos;ve starred, stored locally in this browser.
        </p>
      </div>

      {ids.length === 0 && (
        <p className="text-muted-foreground py-12 text-center text-sm">
          No favorites yet. Star characters from the{" "}
          <Link href="/characters" className="underline">
            characters list
          </Link>
          .
        </p>
      )}

      {ids.length > 0 && isLoading && <CharactersGridSkeleton count={ids.length} />}

      {data && data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
