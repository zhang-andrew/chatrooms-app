import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users-index',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
        users-index works!
        </p>
    `,
    styles: [`
        * {
            background-color: red;
        }
        :host{
            & > :nth-child(1){
                height: 100%;
                width: 100%;
                /* background-color: red; */
                position: relative;
                padding-top: 20%;
            }
        }
    `]
})
export class UsersIndexComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
