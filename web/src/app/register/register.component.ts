import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: any = {
    nickname: "",
    username: "",
    password: ""
  };
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(): void {
    this.registerForm = this.fb.group({
      nickname: [
        this.register.nickname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(11)
        ]
      ],
      username: [
        this.register.username,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ],
      password: [
        this.register.password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18)
        ]
      ]
    });
    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    console.log('onValueChanged', this.registerForm, data);
  }
  registerSubmit() {
    this.registerService.register(this.registerForm.value)
                     .subscribe(
                       results => {
                         if(results.code === 0){
                            this.router.navigate(['/']);
                         }
                       },
                       error =>  console.log(error));
  }
}
