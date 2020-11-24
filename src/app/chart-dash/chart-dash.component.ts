import { Component, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { BarComponent } from '../Charts/bar/bar.component';
import { ChartData } from '../models/chartData';
import { UserInput } from '../models/userInput';
import { DataService } from '../services/data.service';
import { BarInputsComponent } from '../UserControls/bar-inputs/bar-inputs.component';

@Component({
  selector: 'app-chart-dash',
  templateUrl: './chart-dash.component.html',
  styleUrls: ['./chart-dash.component.css']
})
export class ChartDashComponent implements OnInit {

  @ViewChild(BarInputsComponent, {static: false}) inputs: BarInputsComponent;
  @ViewChild(BarComponent, {static: false}) chart: BarComponent;

  barData: ChartData;
  units: number;
  cons: number;

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.getChartData().subscribe(res => {
      this.barData = res;
    });
  }


  calcData(event: UserInput) {
    this.barData.units = event.energy / 1.5;
    this.barData.consumption = event.electricityCost;
    this.inputs.costs = this.barData.units * 5;
    this.barData.gasCost = event.gasCost;
    this.barData.waterUsage = event.water;
    // this.units = event.energy;
    // this.cons = event.electricityCost;
    this.data.setChartData(this.barData);
    //this.chart.updateChart();
  }

}
