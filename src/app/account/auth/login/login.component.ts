import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  rfContact: any;
  checkLogin: any;
  // post:any;
  data: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpClient: HttpClient
  ) {}
  public dataUser = <any>[];
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSignIn() {
    // this.checkLogin = false;
    // this.dataUser =
    //   (JSON.parse(localStorage.getItem('user') || '{}') as string) || <any>[];
    // if (
    //   this.dataUser.find(
    //     (user: any) =>
    //       user.email == this.rfContact.value.email &&
    //       user.password == this.rfContact.value.password
    //   )
    // ) {
    //   console.log('Đăng nhập thành công');
    //   this.route.navigate(['../','pages','general']);
    //   var nameEmail = this.rfContact.value.email;
    //   localStorage.setItem('isLogin', nameEmail);
    // } else {
    //   console.warn('Thông tin đăng nhập không chính xác!');
    //   this.checkLogin = true;
    //   this.rfContact.reset();
    // }

    this.data = {
      email: this.rfContact.value.email,
      password: this.rfContact.value.password,
    };
    if (this.rfContact.invalid) {
      console.warn('Thông tin đăng nhập không chính xác!');
      this.checkLogin = true;
    } else {
      this.postLogin(this.data).subscribe((res) => {
        if (res.status == 'success') {
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('name', this.data.email);
          localStorage.setItem('token', res.data.access_token);
          this.route.navigate(['../', 'pages', 'general']);
        }else{
          console.log("Dang nhap khong thanh cong")
        }
      });
    }
  }

  postLogin(data: any): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/admin/auth/login',
      data
    );
  }

  onRegister() {
    this.route.navigateByUrl('/account/auth/register');
  }
}
