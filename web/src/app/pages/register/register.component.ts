import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({ // <-- the parent FormGroup
      nickname: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSendCode() {
    console.log(111);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.status);
  }

}
