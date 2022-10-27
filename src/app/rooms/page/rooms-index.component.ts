import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms-index',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      rooms-index works!
    </p>
  `,
  styles: [
  ]
})
export class RoomsIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
