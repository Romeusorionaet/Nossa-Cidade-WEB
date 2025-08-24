import { Suspense } from "react";
import { MapComponent } from "./components/map";

export default function MapCity() {
  return (
    <main>
      <Suspense fallback={null}>
        <MapComponent />
      </Suspense>
    </main>
  );
}
