import { APP_ROUTES } from "../app-routes";

export const PRICES_MENU = [
  {
    title: "Como funciona a plataforma",
    items: [
      { label: "Cadastro gratuito", href: APP_ROUTES.public.prices },
      { label: "Planos para comerciantes", href: APP_ROUTES.public.prices },
      { label: "Benefícios para clientes", href: APP_ROUTES.public.prices },
    ],
  },
];
