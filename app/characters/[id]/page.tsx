import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FavoriteButton } from "@/components/characters/favorite-button";
import { getCharacter } from "@/lib/rickandmorty/api";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/characters" />}
      >
        <ArrowLeft data-icon="inline-start" />
        Back to characters
      </Button>

      <Suspense fallback={<CharacterDetailSkeleton />}>
        <CharacterDetail params={params} />
      </Suspense>
    </div>
  );
}

async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const characterId = Number(id);

  if (!Number.isInteger(characterId)) notFound();

  const character = await getCharacter(characterId);
  if (!character) notFound();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Image
        src={character.image}
        alt={character.name}
        width={320}
        height={320}
        className="aspect-square w-full max-w-xs rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-heading text-2xl font-semibold">
            {character.name}
          </h1>
          <FavoriteButton characterId={character.id} />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{character.status}</Badge>
          <Badge variant="outline">{character.species}</Badge>
          <Badge variant="outline">{character.gender}</Badge>
          {character.type && <Badge variant="outline">{character.type}</Badge>}
        </div>

        <Separator />

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Origin</dt>
          <dd>{character.origin.name}</dd>
          <dt className="text-muted-foreground">Last known location</dt>
          <dd>{character.location.name}</dd>
          <dt className="text-muted-foreground">Episodes</dt>
          <dd>{character.episode.length}</dd>
          <dt className="text-muted-foreground">First seen (added)</dt>
          <dd>{new Date(character.created).toLocaleDateString()}</dd>
        </dl>
      </div>
    </div>
  );
}

function CharacterDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Skeleton className="aspect-square w-full max-w-xs rounded-xl" />
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
