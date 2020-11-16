import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartDashComponent } from './chart-dash/chart-dash.component';
import { BarComponent } from './Charts/bar/bar.component';


const routes: Routes = [
  {
    path: '', component: ChartDashComponent,
  },
  {
    path: 'bar', component: BarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
