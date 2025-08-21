import { MARKERS } from "@/constants/markers";

export const sizesIcon = {
  large: "18px",
  medium: "15px",
  small: "10px",
};

export const sizesName = {
  large: "16px",
  medium: "13px",
  small: "8px",
};

const createCustomMarker = ({
  icon,
  sizeIcon,
  sizeName,
  name,
}: {
  icon: string;
  sizeIcon: string;
  sizeName: string;
  name: string;
}) => {
  const markerElement = document.createElement("div");
  markerElement.style.fontSize = sizeIcon.toString();
  markerElement.style.cursor = "pointer";
  markerElement.style.textAlign = "center";

  const iconElement = document.createElement("div");
  iconElement.textContent = icon;
  markerElement.appendChild(iconElement);

  const nameElement = document.createElement("span");
  nameElement.textContent = name;
  nameElement.style.color = "black";
  nameElement.style.fontSize = sizeName.toString();
  nameElement.style.backgroundColor = "white";

  markerElement.appendChild(nameElement);

  return markerElement;
};

export function getMarkerElement({
  icon,
  sizeIcon,
  sizeName,
  name,
}: {
  icon: keyof typeof MARKERS;
  sizeIcon: keyof typeof sizesIcon;
  sizeName: keyof typeof sizesName;
  name: string;
}) {
  return createCustomMarker({
    icon: MARKERS[icon],
    sizeIcon: sizesIcon[sizeIcon],
    sizeName: sizesName[sizeName],
    name,
  });
}
