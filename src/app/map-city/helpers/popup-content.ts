import { APP_ROUTES } from "@/constants/app-routes";

interface Props {
  name: string;
  status: string;
  id: string;
}

export function popupContent({ name, status, id }: Props) {
  const popupContent = document.createElement("div");
  popupContent.classList.add(
    "popup-container",
    "flex",
    "flex-col",
    "items-center",
    "gap-1",
  );

  const textElement = document.createElement("p");
  textElement.classList.add("text-black", "text-xs");

  // biome-ignore lint/style/useTemplate: <explanation>
  const nameNode = document.createTextNode(name + " ");
  textElement.appendChild(nameNode);

  const spanElement = document.createElement("span");
  spanElement.textContent = `- ${status}`;
  spanElement.classList.add("text-zinc-500", "text-xs");

  textElement.appendChild(spanElement);

  const link = document.createElement("a");
  link.textContent = "Entrar";
  link.href = `${APP_ROUTES.public.businessPoint.details}/${id}`;
  link.classList.add(
    "text-blue-600",
    "underline",
    "cursor-pointer",
    "text-xs",
    "inline-block",
  );

  popupContent.appendChild(textElement);
  popupContent.appendChild(link);

  return popupContent;
}
