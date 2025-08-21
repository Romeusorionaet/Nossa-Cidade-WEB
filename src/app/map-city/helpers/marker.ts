import maplibregl from "maplibre-gl";

export function filterMarkers(
  markersMap: Map<string, maplibregl.Marker>,
  filteredIds: Set<string>,
) {
  markersMap.forEach((marker, id) => {
    const el = marker.getElement();
    el.style.display = filteredIds.has(id) ? "block" : "none";
  });
}

export function resetMarkersVisibility(
  markersMap: Map<string, maplibregl.Marker>,
) {
  markersMap.forEach((marker) => {
    const el = marker.getElement();
    el.style.display = "block";
  });
}
