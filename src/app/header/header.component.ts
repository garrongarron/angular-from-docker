import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: string = '...loading'
  constructor(private timer: TimerService) { }

  ngOnInit(): void {
    console.log(this.timer.getCurrentDate());
    this.timer.getCurrentDate().subscribe(data => {
      this.date = JSON.stringify(data);
      console.log(JSON.stringify(data))
    }, error => {
      console.error(error)
    },
     ()=> console.log('done!'));
  }

}
