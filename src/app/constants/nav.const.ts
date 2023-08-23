export const NavConstants = [
  {
    title: "DashBoard",
    level: 1,
    items: [
      {
        label: "Dashboard",
        path: "/administration/dasboard",
        level: 2,
      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-tv-2 text-primary",
  },

  {
    title: "Achat",
        level: 1,

    items: [
      {
        label: "Commandes",
        path: "/administration/achat/commandes",
        display: true,
            level: 2,

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-cart text-orange",
  },

  {
    title: "Boutique",
        level: 1,

    items: [
      {
        label: "Astuce & Conseil",
        path: "/administration/boutique/astuce-conseil",
        display: true,
            level: 2,

      },
      {
        label: "Banniere",
        path: "/administration/boutique/banniere",
        display: true,
            level: 2,

      },
      {
        label: "Disposition",
        path: "/administration/boutique/display",
        display: false,
            level: 2,

      },
      {
        label: "Type Astuce & Conseil",
        path: "/administration/boutique/type-astuce-conseil",
        display: false,
            level: 2,

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-shop text-success",
  },
  {
    title: "Catalogue",
        level: 1,

    items: [
      {
        label: "Gestion promotion",
        path: "/administration/catalogue/promotions",
        display: true,
            level: 2,

      },
      {
        label: "Gestion produits",
        path: "/administration/catalogue/produits",
        display: true,
            level: 2,

      },
      {
        label: "Gestion catégorie produits",
        path: "/administration/catalogue/categorie-produit",
        display: true,
            level: 2,

      },
      {
        label: "Gestion packs",
        path: "/administration/catalogue/packs",
        display: true,
            level: 2,

      },
      {
        label: "Gestion type packs",
        path: "/administration/catalogue/typepack",
        display: true,
            level: 2,

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-active-40 text-yellow",
  },
  {
    title: "Ressource humaine",
        level: 1,
    items: [
      {
        label: "Gestion administrateurs",
        path: "/administration/ressource-humaine/administrateur",
        display: true,
            level: 2,

      },
      {
        label: "Gestion clients",
        path: "/administration/ressource-humaine/client",
        display: true,
            level: 2,

      },
      {
        label: "Gestion role et permission",
        path: "/administration/ressource-humaine/role-permission",
        display: true,
            level: 2,

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-user-run text-danger",
  },
  {
    title: "Parametre",
        level: 1,

    items: [
      {
        label: "Gestion Zone",
        path: "/administration/parametre/zone",
        display: true,
            level: 2,

      },
      {
        label: "Gestion prix livraison",
        path: "/administration/parametre/prix-livraison",
        display: true,
            level: 2,

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-settings ",
  },
];
