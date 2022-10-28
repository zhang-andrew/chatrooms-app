import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AUthService } from "../../../"

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    constructor(public authService?: AuthService) {
        console.log("dis worked");
        console.log(authService.userData)
    }

    ngOnInit(): void {
    }

}
