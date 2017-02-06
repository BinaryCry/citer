import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  name: string;
  sname: string;

  constructor() {
    this.name = 'Alex'; // доступно в пределах разметки компонента
    this.sname = 'Step';
  }

  ngOnInit() {
  }

}
