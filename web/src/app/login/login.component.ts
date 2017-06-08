import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm: FormGroup;
  login = {
    username: '',
    password: ''
  };
  formErrors = {
    'username': '',
    'password': ''
  };
  validationMessages = {
    'password': {
      'required':      '密码不能为空',
      'minlength':     '密码长度不能小于6位',
      'maxlength':     '密码长度不能大于18位'
    },
    'username': {
      'required': '手机号不能为空'
    }
  };
  constructor(
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.onValueChanged();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: [
        this.login.username
      ],
      password: [
        this.login.password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18)
        ]
      ]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    console.log('onValueChanged', this.loginForm, data);
  }
  loginSubmit(): void {
    this.router.navigate(['/home']);
    console.log(this.loginForm.get('password').errors);
  }
}
