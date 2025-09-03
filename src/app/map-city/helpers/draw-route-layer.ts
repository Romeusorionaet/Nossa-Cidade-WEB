export function drawRouteLayer(
  map: maplibregl.Map,
  route: GeoJSON.Feature<GeoJSON.LineString>,
  id: string,
) {
  const source = map.getSource(id);

  if (source) {
    (source as maplibregl.GeoJSONSource).setData(route);
  } else {
    map.addSource(id, {
      type: "geojson",
      data: route,
    });

    if (!map.getLayer(id)) {
      map.addLayer({
        id,
        type: "line",
        source: id,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#007cbf",
          "line-width": 5,
        },
      });
    }
  }
}
