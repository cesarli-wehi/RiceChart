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

  waterValueChanged(event) {
    this.userInputs.water = event;
    this.inputChange.emit(this.userInputs);
  }

  electricityValueChanged(event) {
    this.userInputs.electricityCost = event;
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
