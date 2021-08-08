import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  errorMessage = '';
  loginProcess = false;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(),
    });
  }

  async tryLogin(value) {
    this.loginProcess = true;
    const credential = await this.authService.login(value);
    this.loginProcess = false;

    if (credential && credential.user) {
      // this.toastr.success('You are logged in.', ' Success!', { progressBar: true });
      this.router.navigate(['/tradeJournal']);
    } else {
      this.loginForm.setValue({ email: value.email, password: '' });
      // this.toastr.error('Wrong email or password.', 'Oops!', { progressBar: true });
    }
  }

  home = true;
  blog = false;
  homeMenuShow() {
    this.home = true;
    this.blog = false;
  }
  blogMenuShow(value) {
    if (value == 'home') {
      this.home = true;
      this.blog = false;
    }
    else {
      this.home = false;
      this.blog = true;
    }

  }
}
