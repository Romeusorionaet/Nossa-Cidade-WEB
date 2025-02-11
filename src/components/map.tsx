'use client'

import { useEffect, useRef, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { useQuery } from '@tanstack/react-query'
import { getBusinessPointForMapping } from '@/actions/get/business-point/get-business-point-for-mapping'
import { maplibreglStyle, maplibreglTiles } from '@/actions/services/maplibregl'
import { openRouteServiceDriveCar } from '@/actions/services/open-route-services'

interface TravelInfo {
  duration: string
}

const polygonBounds: [number, number, number, number] = [
  -35.17, -6.42, -35.1, -6.35,
]
const centerLng = (polygonBounds[0] + polygonBounds[2]) / 2
const centerLat = (polygonBounds[1] + polygonBounds[3]) / 2

const startPoint: [number, number] = [-35.141074, -6.375577]
const endPoint: [number, number] = [-35.135143, -6.377087]

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null)
  const [selectedLngAndLat, setSelectedLngAndLat] = useState<{
    lng: number
    lat: number
  } | null>(null)

  const { data } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => getBusinessPointForMapping(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (!mapContainerRef.current) return

    async function initializeMap() {
      const map = new maplibregl.Map({
        container: mapContainerRef.current as HTMLElement,
        center: [centerLng, centerLat],
        style: await maplibreglStyle(),
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        maxBounds: polygonBounds,
      })

      new maplibregl.Marker().setLngLat(startPoint).addTo(map)
      new maplibregl.Marker().setLngLat(endPoint).addTo(map)

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

      map.on('click', (e) => {
        const { lng, lat } = e.lngLat
        setSelectedLngAndLat({ lng, lat })
      })

      map.on('load', () => {
        if (data) {
          data.map((item: any) => {
            return new maplibregl.Marker({
              element: createCustomMarker(),
            })
              .setLngLat([item.location.latitude, item.location.longitude])
              .setPopup(
                new maplibregl.Popup().setHTML(`<p>${item.name}! 🍕</p>`),
              )
              .addTo(map)
          })
        }
      })

      await openRouteServiceDriveCar({ endPoint, startPoint }).then((data) => {
        const route = data.features[0].geometry.coordinates

        const duration = data.features[0]?.properties?.segments[0]?.duration

        setTravelInfo({ duration: (duration / 60).toFixed(2) + ' min' })

        if (!route) {
          alert('A rota não contém geometria.')
          return
        }

        const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        }

        map.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON,
        })

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#007cbf',
            'line-width': 5,
          },
        })
      })

      return () => map.remove()
    }

    initializeMap()
  }, [data])

  function createCustomMarker() {
    const markerElement = document.createElement('div')
    markerElement.style.fontSize = '30px'
    markerElement.textContent = '🍕'
    markerElement.style.cursor = 'pointer'
    markerElement.style.textAlign = 'center'
    markerElement.style.lineHeight = '30px'
    return markerElement
  }

  return (
    <div className="h-screen">
      <div
        ref={mapContainerRef}
        className="h-screen overflow-hidden"
        style={{ height: '100%', width: '100%' }}
      />
      {travelInfo && (
        <div className="absolute left-5 top-5 rounded-md bg-white p-2">
          <p className="text-black">Tempo estimado: {travelInfo.duration}</p>
        </div>
      )}

      {selectedLngAndLat && (
        <div className="absolute right-5 top-5 rounded-md bg-white p-2">
          <p className="text-black">lat: {selectedLngAndLat.lat.toFixed(6)}</p>
          <p className="text-black">lng: {selectedLngAndLat.lng.toFixed(6)}</p>
        </div>
      )}
    </div>
  )
}
