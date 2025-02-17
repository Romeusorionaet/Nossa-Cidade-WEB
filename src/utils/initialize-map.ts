import maplibregl from 'maplibre-gl'
import { getMarkerElement, markers } from './get-marker-element'
import { checkBusinessStatus } from './check-business-status'
import { maplibreglTiles } from '@/actions/services/maplibregl'
import { RefObject } from 'react'
import { businessPointType } from '@/core/@types/business-points'

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>
  providerMapContainer: () => Promise<maplibregl.Map>
  handlePointRoute: ({ lat, lng }: { lat: number; lng: number }) => void
  businessPointsFiltered: businessPointType[]
  pointsToShow: businessPointType[] | undefined
  businessPointNotFound: boolean
  businessPointCategories:
    | {
        id: string
        name: string
      }[]
    | undefined
  markersRef: RefObject<maplibregl.Marker[]>
}

export async function initializeMap({
  mapContainerRef,
  providerMapContainer,
  handlePointRoute,
  businessPointsFiltered,
  pointsToShow,
  businessPointNotFound,
  businessPointCategories,
  markersRef,
}: Props) {
  if (!mapContainerRef.current) return

  const map = await providerMapContainer()

  map.on('load', async () => {
    const layers = map.getStyle().layers!
    let labelLayerId
    for (const layer of layers) {
      if (layer.type === 'symbol' && layer.layout?.['text-field']) {
        labelLayerId = layer.id
        break
      }
    }

    map.addSource('openmaptiles', {
      url: await maplibreglTiles(),
      type: 'vector',
    })

    map.addLayer(
      {
        id: '3d-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
        type: 'fill-extrusion',
        minzoom: 15,
        filter: ['!=', ['get', 'hide_3d'], true],
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'render_height'],
            0,
            'lightgray',
            200,
            'royalblue',
            400,
            'lightblue',
          ],
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            16,
            ['get', 'render_height'],
          ],
          'fill-extrusion-base': [
            'case',
            ['>=', ['get', 'zoom'], 16],
            ['get', 'render_min_height'],
            0,
          ],
        },
      },
      labelLayerId,
    )
  })

  let currentMarker: maplibregl.Marker | null = null
  map.on('click', (e) => {
    const { lng, lat } = e.lngLat
    handlePointRoute({ lat, lng })

    if (currentMarker) {
      currentMarker.remove()
    }

    currentMarker = new maplibregl.Marker({
      element: getMarkerElement({ icon: 'click', size: 'small', name: '' }),
    })
      .setLngLat([lng, lat])
      .addTo(map)
  })

  const filteredIds = new Set(businessPointsFiltered.map((point) => point.id))

  markersRef.current.forEach((marker) => {
    const markerId = marker.getElement().dataset.id
    marker.getElement().style.display = filteredIds.has(markerId!)
      ? 'block'
      : 'none'
  })

  pointsToShow?.forEach(({ id, location, name, categoryId, openingHours }) => {
    if (
      businessPointNotFound &&
      markersRef.current.some((marker) => marker.getElement().dataset.id === id)
    )
      return

    const category = businessPointCategories?.find(
      (category) => category.id === categoryId,
    )
    const iconName = category?.name.replace(/\s+/g, '_')
    const status = checkBusinessStatus(openingHours)

    const popup = new maplibregl.Popup().setDOMContent(
      Object.assign(document.createElement('p'), {
        textContent: `${name} - ${status}`,
        classList: 'text-black',
      }),
    )

    const markerElement = getMarkerElement({
      icon: iconName as keyof typeof markers,
      size: 'medium',
      name: '',
    })

    markerElement.dataset.id = id

    const marker = new maplibregl.Marker({ element: markerElement })
      .setLngLat([location.latitude, location.longitude])
      .setPopup(popup)
      .addTo(map)

    markersRef.current.push(marker)
  })

  return () => map.remove()
}
