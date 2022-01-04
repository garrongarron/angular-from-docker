import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rForm: FormGroup
  post: any
  name: string = ''
  description: string = ''

  alertName: string = 'Required'
  alertDescription: string = 'Required [10-20]'
  alertCustom: string = 'write "secret"'

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20)
      ])],
      'modifier': '',
      'custom': [null,this.customValidation ],
    })
  }

  ngOnInit(): void {
    this.rForm.get('modifier')?.valueChanges.subscribe(
      value => {
        if (value == '1') {
          this.rForm.get('name')?.setValidators([
            Validators.required,
            Validators.minLength(3),
          ])
          this.alertName = 'Minimum 3!'
        } else {
          this.rForm.get('name')?.setValidators([Validators.required])
          this.alertName = 'Required'
        }
      }
    )
  }

  send(post: any) {
    this.name = post.name
    this.description = post.description
  }

  customValidation(field:FormControl){
    if(field.value == "secret"){
      return null
    }
    return {customName:true}
  }

}
