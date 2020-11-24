import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartData } from '../models/chartData';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  barData = new BehaviorSubject<ChartData>(new ChartData());

  constructor() { }

  // Getters
  setChartData(data: ChartData) {
    this.barData.next(data);
  }

  getChartData(): Observable<ChartData> {
    return this.barData.asObservable();
  }

}
