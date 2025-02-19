import { maplibreglStyle } from '@/actions/services/maplibregl'
import { centerLat, centerLng, polygonBounds } from '@/constants/polygon-bounds'
import maplibregl from 'maplibre-gl'
import { useRef } from 'react'

export function useProviderMapContainer() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const providerMapContainer = async () => {
    if (!mapRef.current) {
      const style = await maplibreglStyle()

      const map = new maplibregl.Map({
        container: mapContainerRef.current as HTMLElement,
        center: [centerLng, centerLat],
        style,
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        maxBounds: polygonBounds,
      })

      mapRef.current = map
    }

    return mapRef.current
  }

  return { providerMapContainer, mapContainerRef }
}
