import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input()  p :any;
  @Output() emitter:EventEmitter<string> =  new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  sendData():boolean{
    this.emitter.emit(this.p);
    console.log('sending', this.p);
    return false;
  }

}
