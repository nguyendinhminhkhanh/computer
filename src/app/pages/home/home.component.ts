import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLogin = localStorage.getItem("isogin");
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.route.navigate(['../','account','auth','login']);
  }
  changPassword(){
    this.route.navigateByUrl('/pages/changePassword');
  }
}
