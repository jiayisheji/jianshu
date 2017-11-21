import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@app/core';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  codeBtnText: string;
  registerForm: FormGroup;
  count: number;
  timer: any;
  constructor(private _zone: NgZone, private fb: FormBuilder, private usersService: UsersService) {
    this.codeBtnText = '获取验证码';
    this.createForm();
    this.count = 60;
    this.timer = null;
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({ // <-- the parent FormGroup
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      username: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{11}$/)])],
      code: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{6}$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(18)])]
    });
  }

  onSendCode() {
    if (this.count !== 60) {
      return;
    }
    /* this.toastService.success('标题', '内容'); */
    this.usersService.getSendCode({ mobile: this.registerForm.value.username }).subscribe((code) => {
      console.log(code);
    });
    this.timer = setInterval(() => {
      if (this.count < 1) {
        clearInterval(this.timer);
        this.codeBtnText = '重新发送';
        this.count = 60;
        return;
      }
      this.codeBtnText = `重新发送(${this.count}s)`;
      this.count--;
    }, 1000);
    console.log(111);
  }

  /**
   * 检查用户名
   */
  onCheckNickname({ valid, value }) {
    if (!value) {
      return;
    }

    this.usersService.checkNickname({ nickname: value }).subscribe((code) => {
      console.log(code);
    }, (err) => {
      console.log(err.error.message);
    });
  }

  onSubmit($event: Event, { valid, value }) {
    $event.stopPropagation();
    if (!valid) {
      return;
    }
    console.log(value);
    console.log(this.registerForm.status);
  }

}
