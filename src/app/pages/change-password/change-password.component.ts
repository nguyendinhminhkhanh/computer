import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  rfContact : any;
  isCheckInfo: any;
  isCheckPass: any;
  isCheckEmail: any;
  constructor(private fb:FormBuilder) {}
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      newPassword: ['',Validators.required],
      enterNewPassword: ['',Validators.required],
    });
  }
  onChange(){
    this.isCheckInfo = false;
    this.isCheckPass = false;
    this.isCheckEmail = false;


    if(this.rfContact.invalid){
      this.isCheckInfo = true;
      console.log('Dien day du thong tin');
    }else if(this.rfContact.value.email != localStorage.getItem("isLogin")){
      this.isCheckEmail = true;
      console.log("Email khong phai cua tk nay");
      console.log(this.rfContact.value.email);
      console.log(localStorage.getItem("isLogin"));
    }else if(this.rfContact.value.newPassword !=  this.rfContact.value.enterNewPassword){
      this.isCheckPass = true;
      console.log('Mat khau khong khop');
    }else{
      console.log("doi mk thanh cong");
      
      this.rfContact.reset();
    }
  }
}
