import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private router: Router,
    private authentication: Authentication
  ) {}

  ngOnInit(): void {}

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  public onLoginSubmit(): void {
    this.formError = '';
    console.log("trying to sub");
    //console.log("credentials: " + this.credentials.email + this.credentials.password)
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
      console.log("trying do login");

    }
  }

  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;
    //console.log("name: ", newUser.name);
    //console.log("email: ", newUser.email);

    console.log('LoginComponent::doLogin');
    //console.log(this.credentials);
    //console.log(this.credentials.password);
    this.authentication.login(newUser, this.credentials.password);

    if(this.authentication.isLoggedIn()){
      console.log('Router::Direct');
      this.router.navigate(['']);
    } else {
      var timer = setTimeout (() => {
        if(this.authentication.isLoggedIn()){
          console.log('Router::Pause');
          this.router.navigate(['']);
        }}, 3000);
    }
  }

}
