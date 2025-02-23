"use server";

async function fetchWithFallback(
  url: string,
  fallbackUrl: string,
): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Request failed");
    return url;
  } catch (error) {
    console.warn(
      "Falha ao carregar do MapTiler, tentando o StadiaMaps:",
      error,
    );
    return fallbackUrl;
  }
}

export async function maplibreglStyle(): Promise<string> {
  const maptilerStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${process.env.MAPTILER_KEY}`;
  const stadiaStyleUrl = `https://tiles.stadiamaps.com/styles/outdoors.json`;

  return await fetchWithFallback(maptilerStyleUrl, stadiaStyleUrl);
}

export async function maplibreglTiles(): Promise<string> {
  const maptilerTilesUrl = `https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.MAPTILER_KEY}`;
  const stadiaTilesUrl = `https://tiles.stadiamaps.com/data/openmaptiles.json`;

  return await fetchWithFallback(maptilerTilesUrl, stadiaTilesUrl);
}
