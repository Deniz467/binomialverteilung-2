import type {Suggestion} from "@/components/not-found";
import {headers} from "next/headers";

export async function getSuggestions(pathname: string): Promise<Suggestion[]> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return [];
  }

  const baseUrl = `${protocol}://${host}`;
  const query = pathname.replace(/^\/+/, "");
  const url = `${baseUrl}/api/search?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {cache: "no-store"});

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  const arr = Array.isArray(data)
      ? data
      : Array.isArray((data as any).results)
          ? (data as any).results
          : [];

  if (arr.length === 0) return [];

  const pages = arr.filter((item: any) => item.type === "page");
  if (pages.length === 0) return [];

  return pages.slice(0, 3).map((item: any) => ({
    id: String(item.id),
    href: String(item.url),
    title: item.content as string,
  }));
}
