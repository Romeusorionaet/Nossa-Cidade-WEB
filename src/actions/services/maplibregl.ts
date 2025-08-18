"use client";

let cachedStyleUrl: string | null = null;
let cachedTilesUrl: string | null = null;

export async function maplibreglStyleCached(): Promise<string> {
  if (cachedStyleUrl) return cachedStyleUrl;

  const cacheKey = "mapStyleUrl";

  const stored = localStorage.getItem(cacheKey);
  if (stored) {
    cachedStyleUrl = stored;
    return cachedStyleUrl;
  }

  const maptilerStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
  const stadiaStyleUrl = "https://tiles.stadiamaps.com/styles/outdoors.json";

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

export async function maplibreglTilesCached(): Promise<string> {
  if (cachedTilesUrl) return cachedTilesUrl;

  const cacheKey = "mapTilesUrl";

  const stored = localStorage.getItem(cacheKey);
  if (stored) {
    cachedTilesUrl = stored;
    return cachedTilesUrl;
  }

  const maptilerTilesUrl = `https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
  const stadiaTilesUrl = "https://tiles.stadiamaps.com/data/openmaptiles.json";

  try {
    const response = await fetch(maptilerTilesUrl);
    if (!response.ok) throw new Error("Falha no MapTiler");
    cachedTilesUrl = maptilerTilesUrl;
    localStorage.setItem(cacheKey, cachedTilesUrl);
    return cachedTilesUrl;
  } catch (e) {
    console.warn("MapTiler falhou, usando StadiaMaps", e);
    cachedTilesUrl = stadiaTilesUrl;
    localStorage.setItem(cacheKey, cachedTilesUrl);
    return cachedTilesUrl;
  }
}
