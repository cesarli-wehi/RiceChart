import { Component, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BarComponent } from '../Charts/bar/bar.component';
import { BarSettings } from '../models/barSettings';
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
  units: BarSettings;
  consumption: BarSettings;
  water: BarSettings;
  methane: BarSettings;
  h2Prod: BarSettings;
  oProd: BarSettings;
  methaneCons: BarSettings;
  co2Prod: BarSettings;
  gasCost: BarSettings;
  roi: BarSettings;

  co2Coal: number;
  co2Oil: number;
  co2Gas: number;
  co2Biofuel: number;


  constructor(
    private data: DataService) {
      this.co2Coal = 0.000986;
      this.co2Oil = 0.000777;
      this.co2Gas = 0.000429;
      this.co2Biofuel = 0.000494;
   }

  ngOnInit() {
    this.data.getChartData().subscribe(res => {
      this.barData = res;
    });

    this.units = {
      colour: '#c297b8ff',
      barName: 'Units',
      barLabel: '1/2 Containers',
      barMax: 10,
      barMin: 0
    };

    this.consumption = {
      colour: 'orange',
      barName: 'KW/h',
      barLabel: 'KW/h',
      barMax: 250,
      barMin: 0
    }

    this.water = {
      colour: '#30bcedff',
      barName: 'H20',
      barLabel: 'M3',
      barMax: 500,
      barMin: 0
    };

    this.methaneCons = {
      colour: '#d7263dff',
      barName: 'Fuel Savings',
      barLabel: 'M3',
      barMax: 1000000,
      barMin: 0
    };

    this.h2Prod = {
      colour: '#89daffff',
      barName: 'H2',
      barLabel: 'M3/h',
      barMax: 100,
      barMin: 0
    };

    this.oProd = {
      colour: '#ff9f1cff',
      barName: 'O',
      barLabel: 'M3/h',
      barMax: 100,
      barMin: 0
    };

    this.co2Prod = {
      colour: '#070707ff',
      barName: 'CO2 Savings',
      barLabel: '£/Yr',
      barMax: 50000,
      barMin: 0
    };

    this.gasCost = {
      colour: 'gray',
      barName: 'Fuel',
      barLabel: 'P/M3',
      barMax: 100,
      barMin: 0
    };

    this.roi = {
      colour: '#7dde92ff',
      barName: 'Roi',
      barLabel: 'Yr',
      barMax: 10,
      barMin: 0
    };

  }


  //increase font 12/14
  //fuel savings with charlie
  //increase bar legend



  calcData(event: UserInput) {
    //calc units
    this.barData.units = Math.ceil(event.energy / 100);

    const newUnitsScale = this.barData.units ? this.barData.units + (this.barData.units/10) : 10;

    this.units.barMax = Math.ceil(newUnitsScale / 10) * 10;

    //calc energy consuption
    this.barData.consumption = (event.electricityCost / 100) * event.energy;

    //calc costs
    this.inputs.costs = this.barData.units * 90000;

    //calc water usage
    this.barData.waterUsage = event.energy * 0.99;

    const newWaterScale = this.barData.waterUsage ? this.barData.waterUsage + (this.barData.waterUsage/10) : 500;

    this.water.barMax = Math.ceil(newWaterScale / 100) * 100;

    //calc h2 prod
    this.barData.hydrogenProd = (35 / 200 * event.energy);

    const newH2Scale = this.barData.hydrogenProd ? this.barData.hydrogenProd + (this.barData.hydrogenProd/10) : 100;

    this.h2Prod.barMax = Math.ceil(newH2Scale / 100) * 100;


    //calc o2 prod
    this.barData.oxygenProd = this.barData.hydrogenProd / 2;

    const newOScale = this.barData.oxygenProd ? this.barData.oxygenProd + (this.barData.oxygenProd/10) : 100;

    this.oProd.barMax = Math.ceil(newOScale / 100) * 100;

    //calc yearly total
    const totalHours = event.uptime * 365;
    const h2Out = this.barData.hydrogenProd * totalHours;
    const energyOfH2 = h2Out / 11.26 * 33.33;
    const lessFuel = energyOfH2 * 11.3627;

    //calc co2 savings
    switch (+event.fuelType) {
      case 1: {
        this.barData.carbonProd = energyOfH2 * this.co2Coal * event.co2Prod;
        break;
      }
      case 2: {
        this.barData.carbonProd = energyOfH2 * this.co2Oil * event.co2Prod;
        break;
      }
      case 3: {
        this.barData.carbonProd = energyOfH2 * this.co2Gas * event.co2Prod;
        break;
      }
      case 4: {
        this.barData.carbonProd = energyOfH2 * this.co2Biofuel * event.co2Prod;
        break;
      }
    }

    const newCo2Scale = this.barData.carbonProd ? this.barData.carbonProd + (this.barData.carbonProd/10) : 5000;

    this.co2Prod.barMax = Math.ceil(newCo2Scale / 1000) * 1000;

    //calc fuel savings
    this.barData.fuelSavings = energyOfH2 / 11.3672;

    const newFuelScale = this.barData.fuelSavings ? this.barData.fuelSavings + (this.barData.fuelSavings/10) : 100000;

    this.methaneCons.barMax = Math.ceil(newFuelScale / 1000) * 1000;

    //calc roi
    const h2Value = energyOfH2 * event.gasCost;
    const oValue = this.barData.oxygenProd * totalHours * event.oValue;
    const co2Value = this.barData.carbonProd;

    this.barData.roi = this.inputs.costs / (h2Value + oValue + co2Value);

    //set data to chart
    this.data.setChartData(this.barData);
  }

}
