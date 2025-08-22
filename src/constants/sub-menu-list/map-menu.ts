import { APP_ROUTES } from "../app-routes";

export const MAP_MENU = [
  {
    title: "Exploração interativa",
    items: [
      {
        label: "Navegue pelo mapa da cidade",
        href: APP_ROUTES.public.mapCity,
      },
      {
        label: "Encontre estabelecimentos próximos",
        href: "#",
      },
      { label: "Filtre por categorias e serviços", href: "#" },
      { label: "Visualize avaliações e horários", href: "#" },
    ],
  },
  {
    title: "Detalhes do ponto comercial",
    items: [
      { label: "Veja informações completas", href: "#" },
      { label: "Galeria de imagens do local", href: "#" },
      { label: "Promoções e ofertas em destaque", href: "#" },
      { label: "Contato e redes sociais", href: "#" },
    ],
  },
];
