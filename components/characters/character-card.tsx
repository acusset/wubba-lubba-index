import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/characters/favorite-button";
import type { Character } from "@/lib/rickandmorty/schemas";

const STATUS_DOT: Record<Character["status"], string> = {
  Alive: "bg-emerald-500",
  Dead: "bg-red-500",
  unknown: "bg-muted-foreground",
};

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Card className="relative">
      <Link href={`/characters/${character.id}`} className="block">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover"
        />
      </Link>
      <div className="absolute right-2 top-2">
        <FavoriteButton characterId={character.id} />
      </div>
      <CardContent className="flex flex-col gap-2">
        <CardTitle>
          <Link href={`/characters/${character.id}`} className="hover:underline">
            {character.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <span
            className={`inline-block size-2 rounded-full ${STATUS_DOT[character.status]}`}
          />
          {character.status} · {character.species}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5">
        <Badge variant="secondary">{character.gender}</Badge>
        <Badge variant="outline" className="truncate max-w-full">
          {character.location.name}
        </Badge>
      </CardFooter>
    </Card>
  );
}
