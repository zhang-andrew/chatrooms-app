import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SingletonService {
    props = {
        showSpinner: false,
    }
    constructor(){
    }
}