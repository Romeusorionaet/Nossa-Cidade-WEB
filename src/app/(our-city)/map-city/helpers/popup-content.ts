interface Props {
  name: string;
  status: string;
  id: string;
}

export function popupContent({ name, status, id }: Props) {
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-container");

  const textElement = document.createElement("p");
  textElement.textContent = `${name} - ${status}`;
  textElement.classList.add("text-black", "text-xs");

  const link = document.createElement("a");
  link.textContent = "Entrar";
  link.href = `/business-point/details/${id}`;
  link.classList.add("text-blue-600", "underline", "cursor-pointer", "text-xs");

  popupContent.appendChild(textElement);
  popupContent.appendChild(link);

  return popupContent;
}
