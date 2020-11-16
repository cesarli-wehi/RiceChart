import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @Input() barColour;
  @Input() barName;
  @Input() barData;
  @Input() barLabel;
  @Input() barMax;

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

  barChartData: ChartDataSets[] = [
    { data: [45], label: 'Test' }
  ];

  constructor() { }

  ngOnInit() {
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
    ]
  }

}
