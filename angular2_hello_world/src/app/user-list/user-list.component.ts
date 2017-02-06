import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
}) export class UserListComponent implements OnInit {

    names: Array<string>; // string[]

    constructor() {
        this.names = ['Carl','Albert','Monica'];
    }

    ngOnInit() {

    }

}
