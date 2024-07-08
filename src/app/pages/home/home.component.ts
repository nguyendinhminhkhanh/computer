import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLogin = localStorage.getItem("isLogin");
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('isLogin');
    this.route.navigate(['../','account','auth','login']);
  }
  changPassword(){
    this.route.navigateByUrl('/pages/changePassword');
  }
}
