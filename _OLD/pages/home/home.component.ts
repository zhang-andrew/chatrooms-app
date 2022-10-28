import { Component, OnInit } from '@angular/core';
//components for template html
// import { UserLoginComponent } from 'src/app/pages/components/user-login/user-login.component';
import { UserLoginComponent } from '../components/user-login/user-login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
