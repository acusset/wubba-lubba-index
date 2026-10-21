import {
  characterListResponseSchema,
  characterSchema,
  type Character,
  type CharacterGender,
  type CharacterListResponse,
  type CharacterStatus,
} from "./schemas";

const BASE_URL = "https://rickandmortyapi.com/api";

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  gender?: CharacterGender;
  page?: number;
};

const EMPTY_LIST: CharacterListResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

function buildCharacterQuery(filters: CharacterFilters): string {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.species) params.set("species", filters.species);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  const query = params.toString();
  return query ? `?${query}` : "";
}

/** Reusable backend query: list characters, optionally filtered and paginated. */
export async function getCharacters(
  filters: CharacterFilters = {},
): Promise<CharacterListResponse> {
  const res = await fetch(`${BASE_URL}/character${buildCharacterQuery(filters)}`);

  if (res.status === 404) return EMPTY_LIST;
  if (!res.ok) {
    throw new Error(`Failed to fetch characters (${res.status})`);
  }

  return characterListResponseSchema.parse(await res.json());
}

/** Reusable backend query: fetch a single character by id. */
export async function getCharacter(id: number): Promise<Character | null> {
  const res = await fetch(`${BASE_URL}/character/${id}`);

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch character ${id} (${res.status})`);
  }

  return characterSchema.parse(await res.json());
}

/** Reusable backend query: fetch multiple characters by id in one request. */
export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];

  const res = await fetch(`${BASE_URL}/character/${ids.join(",")}`);

  if (res.status === 404) return [];
  if (!res.ok) {
    throw new Error(`Failed to fetch characters [${ids.join(",")}] (${res.status})`);
  }

  const data = await res.json();
  const list = Array.isArray(data) ? data : [data];
  return list.map((item) => characterSchema.parse(item));
}
