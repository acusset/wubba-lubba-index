import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { getCharacters } from "@/lib/rickandmorty/api";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        Wubba Lubba Index
      </h1>
      <p className="text-muted-foreground max-w-md">
        Browse, search, and favorite every character pulled live from the{" "}
        <a
          href="https://rickandmortyapi.com/documentation"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rick and Morty API
        </a>
        .
      </p>

      <Suspense fallback={null}>
        <CharacterCount />
      </Suspense>

      <div className="flex gap-3">
        <Button nativeButton={false} render={<Link href="/characters" />}>
          Browse characters
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/favorites" />}
        >
          View favorites
        </Button>
      </div>
    </div>
  );
}

async function CharacterCount() {
  const { info } = await getCharacters();
  return (
    <p className="text-sm text-muted-foreground">
      {info.count} characters across {info.pages} pages
    </p>
  );
}
