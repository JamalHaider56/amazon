import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotlinksent: boolean = false;
  public forgetForm: FormGroup;
  public forgotProcess: boolean = false;
  public forgotemail = '';

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  tryForget(value) {
    this.forgotProcess = true;
    this.authService.doForgot(value)
      .then(res => {
        this.forgotProcess = false;
        this.forgotlinksent = true;
        this.forgotemail = value.email;
        //this.toastr.success('You are logged in.', ' Success!', { progressBar: true });
      }, err => {
        this.forgotProcess = false;
        console.log(err.message);
        this.forgetForm.setValue({ email: '' });
        // this.toastr.error(err.message, 'Oops!', { progressBar: true });
        //this.errorMessage = err.message;
      })
  }

}
