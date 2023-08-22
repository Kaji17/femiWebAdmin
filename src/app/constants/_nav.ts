//definir un id est obligatoire sur les titres, ça sert a leur identification dans l'algo
//tout les menus en dessous d'un titre doivent definir le titreid
//
export interface Perms {
  create?: boolean;
  delete?: boolean;
  update?: boolean;
  id?: boolean;
  others?: boolean;
}

export interface NavItems {
  level: number;
  title: string;
  icon?: string;
  iconpi?: string;
  url?: string;
  selected?: boolean;
  disabled?: boolean;
  isEpandedd?: boolean;
  open?: boolean;
  type?: "button" | "link";
  for?: "agent" | "patron";
  children?: NavItems[];
  permission?: Perms;
  background?: string;
  badge?: boolean;
}

export const navAdminItems: NavItems[] = [
  // DASHBOARD
  {
    level: 1,
    title: "DashBoard",
    disabled: false,
    isEpandedd: false,
    icon: "ni-tv-2 text-primary",
    children: [
      {
        level: 2,
        title: "Dashboard",
        icon: "",
        url: "/administration/dasboard",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },

  // ACHAT
  {
    level: 1,
    title: "Achat",
    disabled: false,
    isEpandedd: false,
    icon: "ni-cart text-orange",
    children: [
      {
        level: 2,
        title: "Commandes",
        icon: "",
        url: "/administration/achat/commandes",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },

  // BOUTIQUE
  {
    level: 1,
    title: "Boutique",
    disabled: false,
    isEpandedd: false,
    icon: "ni-shop text-success",
    children: [
      {
        level: 2,
        title: "Astuce & Conseil",
        icon: "",
        url: "/administration/boutique/astuce-conseil",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Banniere",
        icon: "",
        url: "/administration/boutique/banniere",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Disposition",
        icon: "",
        url: "/administration/boutique/display",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Type Astuce & Conseil",
        icon: "",
        url: "/administration/boutique/type-astuce-conseil",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },

  // CATALOGUE
  {
    level: 1,
    title: "Catalogue",
    disabled: false,
    isEpandedd: false,
    icon: "ni-active-40 text-yellow",
    children: [
      {
        level: 2,
        title: "Gestion promotion",
        icon: "",
        url: "/administration/catalogue/promotions",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion produits",
        icon: "",
        url: "/administration/catalogue/produits",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion catégorie produits",
        icon: "",
        url: "/administration/catalogue/categorie-produit",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion packs",
        icon: "",
        url: "/administration/catalogue/packs",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion type packs",
        icon: "",
        url: "/administration/catalogue/typepack",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },

  // RESSOURCE HUMAINE
  {
    level: 1,
    title: "Ressource humaine",
    disabled: false,
    isEpandedd: false,
    icon: "ni-user-run text-danger",
    children: [
      {
        level: 2,
        title: "Gestion administrateurs",
        icon: "",
        url: "/administration/ressource-humaine/administrateur",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion clients",
        icon: "",
        url: "/administration/ressource-humaine/client",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion role et permission",
        icon: "",
        url: "/administration/ressource-humaine/role-permission",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },

  // PARAMETRE
  {
    level: 1,
    title: "Parametre",
    disabled: false,
    isEpandedd: false,
    icon: "ni-settings ",
    children: [
      {
        level: 2,
        title: "Gestion Zone",
        icon: "",
        url: "/administration/parametre/zone",
        selected: false,
        disabled: false,
        background: "",
      },
      {
        level: 2,
        title: "Gestion prix livraison",
        icon: "",
        url: "/administration/parametre/prix-livraison",
        selected: false,
        disabled: false,
        background: "",
      },
    ],
  },
];
