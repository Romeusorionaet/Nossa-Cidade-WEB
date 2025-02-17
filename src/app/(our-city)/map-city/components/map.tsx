'use client'

import { getBusinessPointForMapping } from '@/actions/get/business-point/get-business-point-for-mapping'
import { openRouteServiceDriveCar } from '@/actions/services/open-route-services'
import { businessPointType } from '@/core/@types/business-points'
import { getMarkerElement } from '@/utils/get-marker-element'
import { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import '@/assets/styles/scrollbar.css'
import { SearchBusinessPoint } from '@/components/search-business-points'
import { FilterBusinessPointsContext } from '@/contexts/filter-business-points'
import { getBusinessPointCategories } from '@/actions/get/business-point/get-business-point-categories'
import { checkBusinessStatus } from '@/utils/check-business-status'
import { orderDays, weekDays } from '@/constants/week-days-order'
import { useProviderMapContainer } from '@/hooks/use-provider-map-container'
import { initializeMap } from '@/utils/initialize-map'

interface TravelInfo {
  duration: string
}

export function Map() {
  const { mapContainerRef, providerMapContainer } = useProviderMapContainer()
  const markersRef = useRef<maplibregl.Marker[]>([])
  const routeMarkersRef = useRef<maplibregl.Marker[]>([])
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null)
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0])
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0])
  const [togglePointType, setTogglePointType] = useState(false)
  const [toggleWindowSearch, setToggleWindowSearch] = useState(false)
  const { businessPointsFiltered, accessQuery } = useContext(
    FilterBusinessPointsContext,
  )

  const myLocation: [number, number] = [-35.13145819818388, -6.378905610634973] // TODO for while

  const businessPointNotFound = businessPointsFiltered.length > 0

  const { data: businessPoints } = useQuery<businessPointType[]>({
    queryKey: ['allBusinessPoints'],
    queryFn: () => getBusinessPointForMapping(),
    staleTime: 1000 * 60 * 60,
  })

  const { data: businessPointCategories } = useQuery<
    { id: string; name: string }[]
  >({
    queryKey: ['allBusinessPointCategories'],
    queryFn: () => getBusinessPointCategories(),
    staleTime: 1000 * 60 * 60,
  })

  const handleWindowSearch = () => {
    toggleWindowSearch
      ? setToggleWindowSearch(false)
      : setToggleWindowSearch(true)
  }

  const handleCleanSearch = () => {
    setToggleWindowSearch(false)
    accessQuery('')
  }

  const handlePointRoute = ({ lat, lng }: { lat: number; lng: number }) => {
    setTogglePointType((prev) => {
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
      setTogglePointType(false)
    } else {
      setTogglePointType(true)
    }
  }

  const handlePlotRoute = async (
    start: [number, number],
    end: [number, number],
  ) => {
    const map = await providerMapContainer()

    if (!start[0] || !end[1]) {
      alert('Selecione os pontos de início e fim antes de traçar a rota.')
      return
    }

    routeMarkersRef.current.forEach((marker) => marker.remove())
    routeMarkersRef.current = []

    const startMarker = new maplibregl.Marker({ color: 'red' })
      .setLngLat(start)
      .addTo(map)
    const endMarker = new maplibregl.Marker({
      element: getMarkerElement({
        icon: 'dot',
        size: 'small',
        name: '',
      }),
    })
      .setLngLat(end)
      .addTo(map)

    routeMarkersRef.current.push(startMarker, endMarker)

    await openRouteServiceDriveCar({
      startPoint: start,
      endPoint: end,
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

    setTogglePointType(false)
  }

  const handleSetLocation = () => {
    setStartPoint(myLocation)
    setTogglePointType(true)
  }

  const handleSelectedPlotRoute = async ({
    lat,
    lng,
  }: {
    lat: number
    lng: number
  }) => {
    const newStart = myLocation
    const newEnd = [lat, lng] as [number, number]

    await handlePlotRoute(newStart, newEnd)

    setToggleWindowSearch(false)
  }

  const handleCleanRoute = async () => {
    const map = await providerMapContainer()

    if (!map) return

    routeMarkersRef.current.forEach((marker) => marker.remove())
    routeMarkersRef.current = []

    if (map.getLayer('route')) {
      map.removeLayer('route')
    }

    if (map.getSource('route')) {
      map.removeSource('route')
    }

    setTravelInfo(null)
    setStartPoint([0, 0])
    setEndPoint([0, 0])
  }

  const pointsToShow = businessPointNotFound
    ? businessPointsFiltered
    : businessPoints

  useEffect(() => {
    const initialize = async () => {
      return initializeMap({
        mapContainerRef,
        providerMapContainer,
        handlePointRoute,
        businessPointsFiltered,
        pointsToShow,
        businessPointNotFound,
        businessPointCategories,
        markersRef,
      })
    }

    initialize()
  }, [
    businessPointsFiltered,
    businessPointNotFound,
    pointsToShow,
    businessPointCategories,
    mapContainerRef,
    providerMapContainer,
  ])

  return (
    <div className="h-screen overflow-hidden">
      <div
        ref={mapContainerRef}
        className="h-screen overflow-hidden"
        style={{ height: '100%', width: '100%' }}
      />
      {travelInfo && (
        <div className="absolute left-1 top-1 rounded-md bg-white p-2">
          <p className="text-black">🚗 - {travelInfo.duration} ⌛</p>
        </div>
      )}

      {startPoint[0] && (
        <div className="absolute right-1 top-1 space-y-3 rounded-md bg-white p-2 text-black">
          <div>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => handleSetLocation()}
                className="w-full rounded-sm border p-1"
              >
                Inserir minha 📍
              </button>
              <p>Início:</p>
            </div>
            <button
              onClick={() => handleChangeArea(false)}
              data-value={togglePointType}
              className="h-14 w-full rounded-md border-4 p-1 text-xs data-[value=false]:border-red-700"
            >
              <p className="opacity-60">lat: {startPoint[0].toFixed(6)}</p>
              <p className="opacity-60">lng: {startPoint[1].toFixed(6)}</p>
            </button>
          </div>

          <div>
            <p className="text-sm">Fim:</p>
            <button
              onClick={() => handleChangeArea(true)}
              data-value={togglePointType}
              className="h-14 w-full rounded-md border-4 text-xs data-[value=true]:border-green-700"
            >
              {endPoint[1] && (
                <div>
                  <div>
                    <p className="opacity-60">lat: {endPoint[0].toFixed(6)}</p>
                    <p className="opacity-60">lng: {endPoint[1].toFixed(6)}</p>
                  </div>
                </div>
              )}
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handlePlotRoute(startPoint, endPoint)}
              className="w-full rounded-sm border p-1 text-sm"
            >
              traçar rota
            </button>

            <button
              onClick={() => handleCleanRoute()}
              className="rounded-sm border p-1 text-sm"
            >
              Limpar rota
            </button>
          </div>
        </div>
      )}

      {businessPointNotFound && (
        <button
          onClick={() => handleWindowSearch()}
          className="absolute bottom-10 right-1 rounded-full bg-white p-5 text-black duration-300 hover:bg-green-200"
        >
          <p className="text-2xl">🗺️</p>
          <span className="absolute right-7 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-200">
            {businessPointsFiltered.length}
          </span>
        </button>
      )}

      <div
        data-value={toggleWindowSearch}
        className="absolute top-0 h-[80%] w-full overflow-hidden rounded-md bg-white p-1 text-black data-[value=false]:hidden max-md:pb-10 md:max-w-96"
      >
        <div className="relative h-10">
          <button
            onClick={() => handleWindowSearch()}
            className="absolute right-0 top-1 h-9 w-8 rounded-full bg-slate-400 p-1 text-xl text-white"
          >
            X
          </button>
          <h2 className="border-b">Resultado da busca</h2>
        </div>

        <div className="scrollbar mt-4 flex h-[85%] w-full flex-col overflow-auto rounded-md p-1">
          {businessPointsFiltered.map((item) => (
            <div key={item.id} className="mb-2 rounded border bg-slate-100 p-2">
              <div className="flex justify-between">
                <p className="font-bold">{item.name}</p>
                <p>{checkBusinessStatus(item.openingHours)}</p>
              </div>
              <ul className="mt-2 text-xs">
                {Object.entries(item.openingHours)
                  .sort(
                    ([a], [b]) => orderDays.indexOf(a) - orderDays.indexOf(b),
                  )
                  .map(([day, { abertura, fechamento }]) => (
                    <li key={day} className="flex justify-between">
                      <span className="font-medium">
                        {weekDays[day] || day}:
                      </span>
                      <span>
                        {abertura} - {fechamento}
                      </span>
                    </li>
                  ))}
              </ul>

              <div className="mt-2 flex w-full justify-end">
                <button
                  onClick={() =>
                    handleSelectedPlotRoute({
                      lat: item.location.latitude,
                      lng: item.location.longitude,
                    })
                  }
                  className="border p-1 text-xs"
                >
                  traçar rota
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleCleanSearch()}
          className="mt-5 rounded-md border p-1"
        >
          Limpar busca
        </button>
      </div>

      <div className="absolute bottom-10 left-1">
        <SearchBusinessPoint />
      </div>
    </div>
  )
}
