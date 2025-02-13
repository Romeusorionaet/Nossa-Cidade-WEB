'use client'

import { getBusinessPointForMapping } from '@/actions/get/business-point/get-business-point-for-mapping'
import { openRouteServiceDriveCar } from '@/actions/services/open-route-services'
import { maplibreglStyle, maplibreglTiles } from '@/actions/services/maplibregl'
import { centerLat, centerLng, polygonBounds } from '@/constants/polygon-bounds'
import { businessPointType } from '@/core/@types/business-points'
import { getMarkerElement } from '@/utils/get-marker-element'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'

interface TravelInfo {
  duration: string
}

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null)
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0])
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0])
  const [isSelectingPointType, setIsSelectingPointType] = useState(false)

  const { data: businessPoints } = useQuery<businessPointType[]>({
    queryKey: ['allProducts'],
    queryFn: () => getBusinessPointForMapping(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handlePointRoute = ({ lat, lng }: { lat: number; lng: number }) => {
    setIsSelectingPointType((prev) => {
      if (!prev) {
        setStartPoint([lng, lat])
      } else {
        setEndPoint([lng, lat])
      }
      return prev
    })
  }

  const handleChangeArea = (value: boolean) => {
    if (!value) {
      setIsSelectingPointType(false)
    } else {
      setIsSelectingPointType(true)
    }
  }

  const providerMapContainer = async () => {
    if (!mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current as HTMLElement,
        center: [centerLng, centerLat],
        style: await maplibreglStyle(),
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        maxBounds: polygonBounds,
      })

      mapRef.current = map
    }

    return mapRef.current
  }

  const handlePlotRoute = async () => {
    const map = await providerMapContainer()

    if (!startPoint || !endPoint) {
      alert('Selecione os pontos de início e fim antes de traçar a rota.')
      return
    }

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    const startMarker = new maplibregl.Marker({ color: 'red' })
      .setLngLat(startPoint)
      .addTo(map)
    const endMarker = new maplibregl.Marker({
      element: getMarkerElement({ icon: 'greenPoint', size: 'small' }),
    })
      .setLngLat(endPoint)
      .addTo(map)

    markersRef.current.push(startMarker, endMarker)

    await openRouteServiceDriveCar({
      startPoint,
      endPoint,
    }).then((data) => {
      if (!data.features || data.features.length === 0) {
        alert('Não foi possível encontrar uma rota.')
        return
      }

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

      if (map.getSource('route')) {
        ;(map.getSource('route') as maplibregl.GeoJSONSource).setData(
          routeGeoJSON,
        )
      } else {
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
      }
    })

    setIsSelectingPointType(false)
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    async function initializeMap() {
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

      map.on('load', () => {
        businessPoints?.forEach(({ location, name }) => {
          const popup = new maplibregl.Popup().setDOMContent(
            Object.assign(document.createElement('p'), {
              textContent: `${name}! 🍕`,
              classList: 'text-black',
            }),
          )

          new maplibregl.Marker({
            element: getMarkerElement({
              icon: 'store',
              size: 'small',
              name,
            }),
          })
            .setLngLat([location.latitude, location.longitude])
            .setPopup(popup)
            .addTo(map)
        })
      })

      return () => map.remove()
    }

    initializeMap()
  }, [businessPoints])

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

      {startPoint && (
        <div className="absolute right-5 top-5 space-y-5 rounded-md bg-white p-2 text-black">
          <p>Início:</p>
          <button
            onClick={() => handleChangeArea(false)}
            data-value={isSelectingPointType}
            className="h-14 w-full rounded-md border-4 p-1 data-[value=false]:border-red-500"
          >
            <p>lat: {startPoint[0].toFixed(6)}</p>
            <p>lng: {startPoint[1].toFixed(6)}</p>
          </button>

          <p>Fim:</p>
          <button
            onClick={() => handleChangeArea(true)}
            data-value={isSelectingPointType}
            className="h-14 w-full rounded-md border-4 p-1 data-[value=true]:border-green-500"
          >
            {endPoint && (
              <div>
                <div>
                  <p>lat: {endPoint[0].toFixed(6)}</p>
                  <p>lng: {endPoint[1].toFixed(6)}</p>
                </div>
              </div>
            )}
          </button>

          <div>
            <button
              onClick={() => handlePlotRoute()}
              className="rounded-sm border p-1"
            >
              traçar rota
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
