'use server'

export async function maplibreglStyle() {
  const response = await fetch(
    `https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.MAPTILER_KEY}`,
  )

  return response.json()
}

export async function maplibreglTiles() {
  return `https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.MAPTILER_KEY}`
}
