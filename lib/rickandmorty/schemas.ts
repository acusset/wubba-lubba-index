import { z } from "zod";

export const characterStatusSchema = z.enum(["Alive", "Dead", "unknown"]);
export const characterGenderSchema = z.enum([
  "Female",
  "Male",
  "Genderless",
  "unknown",
]);

export const namedResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: characterStatusSchema,
  species: z.string(),
  type: z.string(),
  gender: characterGenderSchema,
  origin: namedResourceSchema,
  location: namedResourceSchema,
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export const characterListInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
});

export const characterListResponseSchema = z.object({
  info: characterListInfoSchema,
  results: z.array(characterSchema),
});

export type Character = z.infer<typeof characterSchema>;
export type CharacterListInfo = z.infer<typeof characterListInfoSchema>;
export type CharacterListResponse = z.infer<typeof characterListResponseSchema>;
export type CharacterStatus = z.infer<typeof characterStatusSchema>;
export type CharacterGender = z.infer<typeof characterGenderSchema>;
