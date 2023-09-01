export const NavConstants = [
  {
    title: "DashBoard",
    level: 1,

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    name: "dasboard",
    items: [
      {
        label: "Dashboard",
        path: "/administration/dasboard",
        level: 2,
        display: false,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "dasboard",
      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-tv-2 text-primary",
  },

  {
    title: "Achat",
    level: 1,

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    name: "achat",

    items: [
      {
        label: "Commandes",
        path: "/administration/achat/commandes",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "achat",
      },
      {
        label: "Transactions",
        path: "/administration/achat/transaction",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "transaction",

      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-cart text-orange",
  },

  {
    title: "Boutique",

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    level: 1,
    name: "boutique",

    items: [
      // {
      //   label: "Astuce & Conseil",
      //   path: "/administration/boutique/astuce-conseil",
      //   display: false,
      //   level: 2,
      //   create: false,
      //   update: false,
      //   delete: false,
      //   other: false,
      // name: "astuce-conseil",
      // },
      {
        label: "Banniere",
        path: "/administration/boutique/banniere",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "banniere",
      },
      // {
      //   label: "Disposition",
      //   path: "/administration/boutique/display",
      //   display: false,
      //   level: 2,
      //   create: false,
      //   update: false,
      //   delete: false,
      //   other: false,
      // name: "display",
      // },
      // {
      //   label: "Type Astuce & Conseil",
      //   path: "/administration/boutique/type-astuce-conseil",
      //   display: false,
      //   level: 2,
      //   create: false,
      //   update: false,
      //   delete: false,
      //   other: false,
      // name: "type-astuce-conseil",
      // },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-shop text-success",
  },
  {
    title: "Catalogue",

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    level: 1,
    name: "catalogue",

    items: [
      {
        label: "Gestion promotion",
        path: "/administration/catalogue/promotions",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "promotions",
      },
      {
        label: "Gestion produits",
        path: "/administration/catalogue/produits",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "produits",
      },
      {
        label: "Gestion catégorie produits",
        path: "/administration/catalogue/categorie-produit",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "categorie-produit",
      },
      // {
      //   label: "Gestion packs",
      //   path: "/administration/catalogue/packs",
      //   display: false,
      //   level: 2,
      //   create: false,
      //   update: false,
      //   delete: false,
      //   other: false,
      //  name: "packs",

      // },
      // {
      //   label: "Gestion type packs",
      //   path: "/administration/catalogue/typepack",
      //   display: false,
      //   level: 2,
      //   create: false,
      //   update: false,
      //   delete: false,
      //   other: false,
      //  name: "typepack",

      // },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-active-40 text-yellow",
  },
  {
    title: "Ressource humaine",

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    level: 1,
    name: "ressource-humaine",

    items: [
      {
        label: "Gestion utilisateurs",
        path: "/administration/ressource-humaine/administrateur",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,

        name: "administrateur",
      },
      {
        label: "Gestion clients",
        path: "/administration/ressource-humaine/client",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "client",
      },
      {
        label: "Gestion rôle et permission",
        path: "/administration/ressource-humaine/role-permission",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "role-permission",
      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-user-run text-danger",
  },
  {
    title: "Parametre",

    create: false,
    update: false,
    delete: false,
    other: false,
    display: false,
    level: 1,
    name: "parametre",

    items: [
      {
        label: "Gestion Zone",
        path: "/administration/parametre/zone",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,

        name: "prix-livraison",
      },
      {
        label: "Gestion prix livraison",
        path: "/administration/parametre/prix-livraison",
        display: false,
        level: 2,
        create: false,
        update: false,
        delete: false,
        other: false,
        name: "zone",
      },
    ],
    isEpandedd: false,
    isEpandedd2: false,
    icon: "ni-settings ",
  },
];
