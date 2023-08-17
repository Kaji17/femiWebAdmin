export const NavConstants = [
  {
    title: "DashBoard",
    items: [
      {
        label: "Dashboard",
        path: "/administration/dasboard",
        
      },
    ],
    isEpandedd: false,
    icon: 'ni-tv-2 text-primary'
  },

  {
    title: "Achat",
    items: [
      {
        label: "Commande",
        path: "/administration/achat/commandes",
        display: true,
      },
    ],
        isEpandedd: false,
        icon: 'ni-cart text-orange'

    
  },

  {
    title: "Boutique",
    items: [
      {
        label: "Astuce & Conseil",
        path: "/administration/boutique/astuce-conseil",
        display: true,
      },
      {
        label: "Banniere",
        path: "/administration/boutique/banniere",
        display: true,
      },
      {
        label: "Disposition",
        path: "/administration/boutique/display",
        display: false,
      },
      {
        label: "Type Astuce & Conseil",
        path: "/administration/boutique/type-astuce-conseil",
        display: false,
      },
    ],
        isEpandedd: false,
        icon: 'ni-shop text-success'

  },
  {
    title: "Catalogue",
    items: [
      {
        label: "Gestion promotion",
        path: "/administration/catalogue/promotions",
        display: true,
      },
      {
        label: "Gestion produits",
        path: "/administration/catalogue/produits",
        display: true,
      },
      {
        label: "Gestion packs",
        path: "/administration/catalogue/packs",
        display: true,
      },
      {
        label: "Gestion type packs",
        path: "/administration/catalogue/type-pack",
        display: true,
      },
    ],
        isEpandedd: false,
        icon: 'ni-active-40 text-yellow'

  },
  {
    title: "Ressource humaine",
    items: [
      {
        label: "Gestion administrateurs",
        path: "/administration/ressource-humaine/administrateur",
        display: true,
      },
      {
        label: "Gestion utilisateurs",
        path: "/administration/ressource-humaine/utilisateur",
        display: true,
      },
      {
        label: "Gestion clients",
        path: "/administration/ressource-humaine/client",
        display: true,
      },
      {
        label: "Gestion type utilisateur",
        path: "/administration/ressource-humaine/type-user",
        display: true,
      },
      {
        label: "Gestion role et permission",
        path: "/administration/ressource-humaine/role-permission",
        display: true,
      },
    ],
        isEpandedd: false,
        icon: 'ni-user-run text-danger'

  },
  {
    title: "Parametre",
    items: [
      {
        label: "Gestion Zone",
        path: "/administration/parametre/zone",
        display: true,
      },
      {
        label: "Gestion produits",
        path: "/administration/parametre/prix-livraison",
        display: true,
      },
    ],
        isEpandedd: false,
        icon: 'ni-settings '

  },
];
