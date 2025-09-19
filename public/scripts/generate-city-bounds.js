import * as fs from "node:fs/promises";
import bbox from "@turf/bbox";

async function generateBounds() {
  const geojson = JSON.parse(
    await fs.readFile("public/data/geojson/canguaretama-rn.geojson", "utf-8"),
  );

  const polygonFeatures = {
    type: "FeatureCollection",
    features: geojson.features.filter(
      (f) =>
        f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon",
    ),
  };

  const fullBounds = bbox(polygonFeatures);

  await fs.writeFile(
    "public/data/geojson/bounds/canguaretama-rn-bounds.json",
    JSON.stringify(fullBounds),
  );

  console.log("Bounds gerado com sucesso:", fullBounds);
}

generateBounds();
