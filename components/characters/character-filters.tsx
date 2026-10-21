"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["all", "Alive", "Dead", "unknown"] as const;
const GENDER_OPTIONS = [
  "all",
  "Female",
  "Male",
  "Genderless",
  "unknown",
] as const;

function updateParam(
  params: URLSearchParams,
  key: string,
  value: string | null,
) {
  if (!value || value === "all") {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  params.delete("page");
}

export function CharacterFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [name, setName] = useState(searchParams.get("name") ?? "");

  function navigate(next: URLSearchParams) {
    startTransition(() => {
      router.push(`/characters?${next.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search by name…"
        value={name}
        onChange={(event) => {
          const value = event.target.value;
          setName(value);
          const next = new URLSearchParams(searchParams);
          updateParam(next, "name", value);
          navigate(next);
        }}
        className="max-w-xs"
      />

      <Select
        value={searchParams.get("status") ?? "all"}
        onValueChange={(value) => {
          const next = new URLSearchParams(searchParams);
          updateParam(next, "status", value);
          navigate(next);
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option === "all" ? "Any status" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("gender") ?? "all"}
        onValueChange={(value) => {
          const next = new URLSearchParams(searchParams);
          updateParam(next, "gender", value);
          navigate(next);
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          {GENDER_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option === "all" ? "Any gender" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
