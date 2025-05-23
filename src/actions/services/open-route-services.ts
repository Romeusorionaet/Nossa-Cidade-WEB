"use server";

interface Props {
  startPoint: [number, number];
  endPoint: [number, number];
}

export async function openRouteServiceDriveCar({
  startPoint,
  endPoint,
}: Props) {
  const response = await fetch(
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTESERVICE_KEY}&start=${startPoint[0]},${startPoint[1]}&end=${endPoint[0]},${endPoint[1]}`,
  );

  return response.json();
}
