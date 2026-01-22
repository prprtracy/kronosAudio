// src/lib/content.ts
import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n";

function contentPath(locale: string, file: string) {
  return path.join(process.cwd(), "src", "content", locale, file);
}

async function readJsonFile<T>(locale: Locale, file: string): Promise<T> {
  const candidates: Locale[] = [locale, "en"];

  for (const l of candidates) {
    try {
      const raw = await fs.readFile(contentPath(l, file), "utf-8");
      return JSON.parse(raw) as T;
    } catch {
      // continue
    }
  }

  throw new Error(`Missing content JSON: ${file} for locale ${locale} (and fallback en).`);
}

export async function getContent<T>(locale: Locale, file: string): Promise<T> {
  return readJsonFile<T>(locale, file);
}

export function normalizeLocale(input: string): Locale {
  return input === "en" || input === "fr" || input === "zh" ? (input as Locale) : "en";
}