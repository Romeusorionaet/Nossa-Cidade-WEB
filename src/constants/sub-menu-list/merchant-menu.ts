import { APP_ROUTES } from "../app-routes";

export const MERCHANT_MENU = [
  {
    title: "Visibilidade para comerciantes",
    items: [
      { label: "Cadastre seu estabelecimento", href: "#" },
      { label: "Gerencie sua página comercial", href: "#" },
      { label: "Personalize seu perfil", href: APP_ROUTES.public.user.profile },
      { label: "Receba avaliações de clientes", href: "#" },
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
