import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { BarComponent } from './Charts/bar/bar.component';
import { BarInputsComponent } from './UserControls/bar-inputs/bar-inputs.component';
import { ChartDashComponent } from './chart-dash/chart-dash.component';


@NgModule({
  declarations: [
    BarComponent,
    BarInputsComponent,
    AppComponent,
    ChartDashComponent
   ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ThemeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
