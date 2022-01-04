import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (this.check(form)) {
      localStorage.setItem('email', form.value.email)
      this.router.navigate(['/home'])
    }
  }

  check(form: NgForm): boolean {
    console.log(form.value);
    if (form.value.email == '1' && form.value.password == "1") {     
      return true
    }
    return false
  }

}
