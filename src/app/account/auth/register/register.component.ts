import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  rfContact: any;
  checkEmail: any;
  checkPass: any;
  checkFullInfo: any;
  public dataUser = <any>[];
  constructor(private fb: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
    });
  }

  onLogin(){
    this.route.navigateByUrl('/account/auth/login');
  }

  onRegister() {
    this.checkEmail = false;
    this.checkPass = false;
    this.checkFullInfo = false;

    this.dataUser =
      JSON.parse(localStorage.getItem('user') as string) || <any>[];
    if (
      this.dataUser.find(
        (user: any) => user.email == this.rfContact.value.email
      )
    ) {
      console.warn('Email này đã tồn tại');
      this.checkEmail = true;
      this.rfContact.reset();
      return;
    } else if (this.rfContact.invalid) {
      console.warn('Nhập đầy đủ thông tin đăng kí');
      this.checkFullInfo = true;
      // this.rfContact.reset();
    }else if(this.rfContact.value.password != this.rfContact.value.retypePassword){
      console.warn("Hãy nhập chính xác mật khẩu");
      this.checkPass = true;
    }else {
      this.dataUser.push({
        email: this.rfContact.value.email,
        phone: this.rfContact.value.phone,
        password: this.rfContact.value.password,
      });
      localStorage.setItem('user', JSON.stringify(this.dataUser));
      this.rfContact.reset();
      console.log("dang ki thanh cong");
      this.route.navigateByUrl('/account/auth/login');
      alert("Đăng kí thành công! (chuyển đến trang đăng nhập)");
    }
  }
}
