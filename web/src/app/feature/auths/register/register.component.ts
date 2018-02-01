import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthsService } from '@app/core';
import { ToastService } from '@app/simple';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  codeBtnText: string;
  registerForm: FormGroup;
  count: number;
  timer: any;
  nicknameErrorMessage: string;
  usernameErrorMessage: string;
  constructor(
    private _zone: NgZone,
    private fb: FormBuilder,
    private _auths: AuthsService,
    private toast: ToastService
  ) {
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
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(13[0-9]|14[5-9]|15[0-9]|16[6]|17[0-8]|18[0-9]|19[8-9])\d{8}$/)])],
      code: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{6}$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(18)])]
    });
  }

  getControls(field) {
    return this.registerForm.controls[field];
  }

  cancelErrorMessage(errorMessage: string) {
    this[errorMessage] = '';
  }
  /** 设置错误消息 */
  setErrorMessage(field: string, message: string) {
    this[`${field}ErrorMessage`] = message;
  }
  alert() { }

  onSendCode(alert) {
    const toast = this.toast.success('11111', {
      template: alert,
      buttons: [
        {
          addClass: 'st',
          text: '确定',
          onClick: ($toast) => {
            $toast.destroy()
            // this.toast.remove($toast.id);
          }
        }
      ]
    });
    console.log(toast);
    /* if (dirty && errors.pattern) {
      this.usernameErrorMessage = '手机号码错误，无法发送';
      return;
    }
    if (this.count !== 60) {
      return;
    }

    this.count--;
    this.codeBtnText = `重新发送(${this.count}s)`;
    clearInterval(this.timer);
    this._auths.getSendCode({ mobile: value })
      .subscribe((code) => {
        console.log(code);
        this.toast.success(code.meta.message);
      });
    this.codeBtnText = `重新发送(${this.count}s)`;
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
    console.log(111); */
  }

  /**
   * 检查用户名
   */
  onCheckNickname({ value, dirty, errors }) {
    if (dirty) {
      return;
    }
    this._auths.checkNickname(value).subscribe((code) => {
      console.log(code);
      if (code.meta.code !== 0) {
        this.nicknameErrorMessage = code.meta.message;
      }
    }, (err) => {
      console.log(err.error.message);
    });
  }

  submit($event: Event, registerForm) {
    $event.stopPropagation();
    $event.preventDefault();
    for (const i of Object.keys(this.registerForm.controls)) {
      this.registerForm.controls[i].markAsDirty();
    }
    if (!registerForm.valid) {
      return;
    }
    this._auths.register(registerForm.value).subscribe((code) => {
      console.log(code);
      if (code.meta.code !== 0) {
        this.nicknameErrorMessage = code.meta.message;
      }
    }, (err) => {
      console.log(err.error.message);
    });
  }

}




