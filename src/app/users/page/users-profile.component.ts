import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      users-profile works!
    </p>
  `,
  styles: [
  ]
})
export class UsersProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
