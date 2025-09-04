"use client";

let cachedStyleUrl: string | null = null;

export async function maplibreglStyleCached(): Promise<string> {
  if (cachedStyleUrl) return cachedStyleUrl;

  const cacheKey = "mapStyleUrl";

  const stored = localStorage.getItem(cacheKey);
  if (stored) {
    cachedStyleUrl = stored;
    return cachedStyleUrl;
  }

  const maptilerStyleUrl = `https://api.maptiler.com/maps/basic/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
  const stadiaStyleUrl =
    "https://tiles.stadiamaps.com/styles/alidade_smooth.json";

  try {
    const response = await fetch(maptilerStyleUrl);
    if (!response.ok) throw new Error("Falha no MapTiler");
    cachedStyleUrl = maptilerStyleUrl;
    localStorage.setItem(cacheKey, cachedStyleUrl);
    return cachedStyleUrl;
  } catch (e) {
    console.warn("MapTiler falhou, usando StadiaMaps", e);
    cachedStyleUrl = stadiaStyleUrl;
    localStorage.setItem(cacheKey, cachedStyleUrl);
    return cachedStyleUrl;
  }
}
