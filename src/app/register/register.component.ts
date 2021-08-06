import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  public registerProcess = false;
  // Username Check Process Variable
  public usernameProcess = false;
  public usernameNotExist = false;
  public usernameExist = false;

  // Email Check Process Variable
  public emailProcess = false;
  public emailNotExist = false;
  public emailExist = false;

  public usernameValidationMessage = '';

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onBlurMethodusername() {
    const Username = this.registerForm.get('username').value;
    if (Username.length >= 3) {
      this.usernameProcess = true;
      this.usernameNotExist = false;
      this.usernameExist = false;
      const letters = /^[0-9a-zA-Z]+$/;
      if (Username.match(letters)) {
        this.authService.checkUsernameExist(Username).then(res => {
          this.usernameProcess = false;
          if (res['uname'] == null) {
            this.usernameNotExist = true;
            this.usernameExist = false;
          } else {
            this.usernameValidationMessage = 'Username already exists.';
            this.usernameExist = true;
            this.usernameNotExist = false;
          }
        }, err => {
          console.log(err);

        });
      } else {
        this.usernameProcess = false;
        this.usernameValidationMessage = 'Please input alphanumeric characters only';
        this.usernameExist = true;
        this.usernameNotExist = false;
      }
    }
  }

  onBlurMethodemail() {
    let email = this.registerForm.get('email').value;
  }

  tryRegister(value) {
    this.registerProcess = true;

    this.authService.register(value)
      .then(res => {
        this.registerProcess = false;
        // this.toastr.success('Your account has been successfully created.', ' Congratulations!', { progressBar: true });
        this.router.navigate(['/tradeJournal']);
      }, err => {
        this.registerProcess = false;
        // this.toastr.error(err.message, 'Oops!', { progressBar: true });
      });
  }

}
