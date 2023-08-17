import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {
    path: 'dasboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'achat',
    loadChildren: () =>
      import('./achat/achat.module').then((m) => m.AchatModule),
  },
  {
    path: 'boutique',
    loadChildren: () =>
      import('./boutique/boutique.module').then((m) => m.BoutiqueModule),
  },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
  },
  {
    path: 'ressource-humaine',
    loadChildren: () =>
      import('./ressource-humaine/ressource-humaine.module').then((m) => m.RessourceHumaineModule),
  },
  {
    path: 'parametre',
    loadChildren: () =>
      import('./parametre/parametre.module').then((m) => m.ParametreModule),
  },
  { path: 'profil', component: ProfilComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dasboard' },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
