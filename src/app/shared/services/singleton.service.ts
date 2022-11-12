import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SingletonService {
    props = {
        showSpinner: false,
        // isInRoom: false,
        enteredRoom: false,

    }
    constructor(){
        console.log("SINGLETON-SERVICE");
        
    }
}


//this helped with the singleton service idea v ref below
// https://stackoverflow.com/questions/41451375/passing-data-into-router-outlet-child-components