import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: 'tabs/home',
  },
  {
    path: 'stories',
    redirectTo: 'tabs/stories',
  },
  {
    path: 'profile',
    redirectTo: 'tabs/profile',
  },
  {
    path: 'start-page',
    loadChildren: () =>
      import('./pages/start-page/start-page.module').then(
        (m) => m.StartPagePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'diet',
    loadChildren: () =>
      import('./pages/diet/diet.module').then((m) => m.DietPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'exercise',
    loadChildren: () =>
      import('./pages/exercise/exercise.module').then(
        (m) => m.ExercisePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sleep',
    loadChildren: () =>
      import('./pages/sleep/sleep.module').then((m) => m.SleepPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'steps',
    loadChildren: () =>
      import('./pages/steps/steps.module').then((m) => m.StepsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'water',
    loadChildren: () =>
      import('./pages/water/water.module').then((m) => m.WaterPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'weight',
    loadChildren: () =>
      import('./pages/weight/weight.module').then((m) => m.WeightPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'blood-pressure',
    loadChildren: () =>
      import('./pages/blood-pressure/blood-pressure.module').then(
        (m) => m.BloodPressurePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
