import { Suspense } from "react";
import { CharacterCard } from "@/components/characters/character-card";
import { CharacterFilters } from "@/components/characters/character-filters";
import { CharacterPagination } from "@/components/characters/character-pagination";
import { CharactersGridSkeleton } from "@/components/characters/characters-grid-skeleton";
import { getCharacters, type CharacterFilters as Filters } from "@/lib/rickandmorty/api";
import type { CharacterGender, CharacterStatus } from "@/lib/rickandmorty/schemas";

type SearchParams = {
  name?: string;
  status?: string;
  gender?: string;
  page?: string;
};

export default function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">Characters</h1>
        <p className="text-muted-foreground text-sm">
          Browse every character from Rick and Morty.
        </p>
      </div>

      <Suspense fallback={<div className="h-8" />}>
        <CharacterFilters />
      </Suspense>

      <Suspense fallback={<CharactersGridSkeleton />}>
        <CharactersResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function CharactersResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const filters: Filters = {
    name: params.name || undefined,
    status: isStatus(params.status) ? params.status : undefined,
    gender: isGender(params.gender) ? params.gender : undefined,
    page,
  };

  const { results, info } = await getCharacters(filters);

  if (results.length === 0) {
    return (
      <p className="text-muted-foreground py-12 text-center text-sm">
        No characters match these filters.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <CharacterPagination
        page={page}
        totalPages={info.pages}
        searchParams={{
          name: params.name,
          status: params.status,
          gender: params.gender,
        }}
      />
    </div>
  );
}

function isStatus(value: string | undefined): value is CharacterStatus {
  return value === "Alive" || value === "Dead" || value === "unknown";
}

function isGender(value: string | undefined): value is CharacterGender {
  return (
    value === "Female" ||
    value === "Male" ||
    value === "Genderless" ||
    value === "unknown"
  );
}
