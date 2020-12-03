import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserInput } from 'src/app/models/userInput';

@Component({
  selector: 'app-bar-inputs',
  templateUrl: './bar-inputs.component.html',
  styleUrls: ['./bar-inputs.component.css']
})
export class BarInputsComponent implements OnInit {

  @Output() inputChange: EventEmitter<UserInput> = new EventEmitter<UserInput>();

  userInputs: UserInput;
  costs: number;

  constructor() { }

  ngOnInit() {
    this.userInputs = new UserInput();
  }

  energyValueChanged(event) {
    this.userInputs.energy = event;
    this.inputChange.emit(this.userInputs);
  }

  uptimeValueChanged(event) {
    this.userInputs.uptime = event;
    this.inputChange.emit(this.userInputs);
  }

  methaneValueChanged(event) {
    this.userInputs.methaneCons = event;
    this.inputChange.emit(this.userInputs);
  }

  co2ValueChanged(event) {
    this.userInputs.co2Prod = event;
    this.inputChange.emit(this.userInputs);
  }

  fuelTypeValueChanged(event) {
    this.userInputs.fuelType = event;
    this.inputChange.emit(this.userInputs);
  }

  gasValueChanged(event) {
    this.userInputs.gasCost = event;
    this.inputChange.emit(this.userInputs);
  }

  h2ValueChanged(event) {
    this.userInputs.h2Value = event;
    this.inputChange.emit(this.userInputs);
  }

  oValueChanged(event) {
    this.userInputs.oValue = event;
    this.inputChange.emit(this.userInputs);
  }


}
