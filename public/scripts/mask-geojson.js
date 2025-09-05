import * as fs from "node:fs/promises";
import { featureCollection, polygon, difference, simplify } from "@turf/turf";

const geojson = JSON.parse(
  fs.readFileSync("public/data/geojson/canguaretama-rn.geojson", "utf-8"),
);

const worldPolygon = polygon([
  [
    [-180, -90],
    [-180, 90],
    [180, 90],
    [180, -90],
    [-180, -90],
  ],
]);

const cityPolygons = geojson.features
  .filter(
    (f) => f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon",
  )
  .map((f) => simplify(f, { tolerance: 0.0005, highQuality: true }));

const cityMask = difference(featureCollection([worldPolygon, ...cityPolygons]));

if (!cityMask) {
  throw new Error("Não foi possível gerar a máscara da cidade.");
}

fs.writeFileSync(
  "public/data/geojson/canguaretama-mask.geojson",
  JSON.stringify(cityMask),
);

console.log("Máscara gerada com sucesso!");
