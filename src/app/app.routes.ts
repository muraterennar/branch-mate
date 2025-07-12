import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'generate-branch',
    pathMatch: 'full',
  },
  {
    path: 'generate-branch',
    loadComponent: () =>
      import('./components/generate-info/generate-info.component').then(
        (m) => m.GenerateInfoComponent
      ),
  },
];
