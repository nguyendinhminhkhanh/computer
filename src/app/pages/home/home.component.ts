import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLogin = localStorage.getItem("name");
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('isLogin');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.route.navigate(['../','account','auth','login']);
  }
  changPassword(){
    this.route.navigateByUrl('/pages/changePassword');
  }
}
