import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
})
export class ChildComponent implements OnInit {

  parentMsg: any;
  @Input() set greetMsg(msg: string) {
    this.parentMsg = msg;
  }
  get greetMsg() {
    return this.parentMsg;
  }

  @Output() newValue = new EventEmitter();
  counter: any = 0;

  constructor() { }

  ngOnInit() {
  }

  changedValue() {
    this.counter = this.counter + 1;
    this.newValue.emit(this.counter);
  }

}
