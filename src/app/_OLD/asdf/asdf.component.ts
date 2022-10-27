import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asdf',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      asdf works!
    </p>
  `,
  styles: [
  ]
})
export class AsdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
