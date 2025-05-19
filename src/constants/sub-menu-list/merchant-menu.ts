import { APP_ROUTES } from "../app-routes";

export const MERCHANT_MENU = [
  {
    title: "Visibilidade para comerciantes",
    items: [
      {
        label: "Cadastre seu estabelecimento",
        href: APP_ROUTES.public.businessPoint.registerBusinessPoint,
      },
      {
        label: "Gerencie sua página comercial",
        href: APP_ROUTES.public.user.myBusinessPoints,
      },
      { label: "Personalize seu perfil", href: APP_ROUTES.public.user.profile },
      { label: "Receba avaliações de clientes", href: "#" },
    ],
  },
  {
    title: "Produtos do comercio",
    items: [
      {
        label: "Gerênciamento de produtos",
        href: "#",
      },
      {
        label: "Registre o seu produto",
        href: "#",
      },
    ],
  },
  {
    title: "Ferramentas de gestão",
    items: [
      { label: "Acesse o dashboard comercial", href: "#" },
      { label: "Monitore interações e visitas", href: "#" },
      { label: "Adicione produtos e serviços", href: "#" },
      { label: "Crie campanhas promocionais", href: "#" },
    ],
  },
];
