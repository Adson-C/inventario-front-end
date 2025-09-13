import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Route[] = [
  // Define your routes here, e.g., { path: '', redirectTo: '/home', pathMatch: 'full' }
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false, useHash: true}
    ),
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
