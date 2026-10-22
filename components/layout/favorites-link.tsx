"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";

export function FavoritesLink() {
  const { ids } = useFavorites();

  return (
    <Link href="/favorites" className="hover:underline">
      Favorites
      {ids.length > 0 && <> ({ids.length})</>}
    </Link>
  );
}
