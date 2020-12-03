import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective, {static: false}) public chart: BaseChartDirective;
  @Input() barColour;
  @Input() barName;
  @Input() barData;
  @Input() barLabel;
  @Input() barMax;
  @Input() barMin;

  barChartOptions: ChartOptions;
  barChartLabels: Label[] = ['Test'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColours = [
    {
      backgroundColor: 'blue'
    }
  ];

  barChartData: ChartDataSets[];

  constructor() {
  }

  ngOnInit() {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

  drawChart() {
    this.barChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: { fontColor: 'black' },
          gridLines: { color: 'rgba(255,255,255,0.1)' },
          display: true,
        }],
        yAxes: [{
          ticks: {
            fontColor: 'black',
            beginAtZero: true,
            max: this.barMax,
            min: this.barMin
          },
          gridLines: { color: 'rgba(255,255,255,0.1)' },
          display: true,
        }]
      },
      layout : {
        padding: {
          left: 10,
          right: 10,
        }
      },
      maintainAspectRatio: false,
    };

    this.barChartColours  = [{
      backgroundColor: this.barColour
    }];
    this.barChartLabels = [this.barName];
    this.barChartData = [
      {
        data: this.barData,
        label: this.barLabel,
        barThickness: 100,
        barPercentage: 1.0,
      }
    ];

  }

  updateChart() {
    if(this.barChartData) {
      this.barChartData[0]['data'] = [this.barData];
    }
    // just trying refresh full variable
    //this.barChartData = this.barChartData.slice();

  }

}
