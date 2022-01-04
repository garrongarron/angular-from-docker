import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  names:string[] = ["aaa","bbb","ccc"]
  title:string = "..."
  constructor() { }

  ngOnInit(): void {
  }
  dataFromChild(data:any){
    console.log(17, data);
    
    this.title = data;
  }

}
