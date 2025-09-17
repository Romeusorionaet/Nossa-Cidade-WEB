export async function getUserCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
  error?: string;
}> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        error: "Geolocalização não é suportada pelo seu navegador.",
        longitude: 0,
        latitude: 0,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (err) => {
        resolve({
          error: `Erro ao obter localização: ${err.message}`,
          longitude: 0,
          latitude: 0,
        });
      },
    );
  });
}
