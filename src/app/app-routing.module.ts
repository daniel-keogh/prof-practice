import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'tabs/home'
  },
  {
    path: 'profile',
    redirectTo: 'tabs/profile'
  },
  {
    path: 'start-page',
    loadChildren: () =>
      import('./pages/start-page/start-page.module').then(
        m => m.StartPagePageModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    // canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
    // canActivate: [AuthGuard]
  },  {
    path: 'diet',
    loadChildren: () => import('./pages/diet/diet.module').then( m => m.DietPageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./pages/exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'sleep',
    loadChildren: () => import('./pages/sleep/sleep.module').then( m => m.SleepPageModule)
  },
  {
    path: 'water',
    loadChildren: () => import('./pages/water/water.module').then( m => m.WaterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
