import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'car-details/:carId',
    loadComponent: () => import('./pages/car-details/car-details.page').then( m => m.CarDetailsPage)
  },
  {
    path: 'profile/:userId',
    loadComponent: () => import('./pages/tab3/tab3.page').then( m => m.Tab3Page)
  },
  {
    path: 'createcar',
    loadComponent: () => import('./pages/create-car/create-car.page').then( m => m.CreateCarPage)
  },
];
