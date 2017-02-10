import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
}) export class UserItemComponent implements OnInit {

  @Input() name: string;
  sname: string;

  constructor() {
    // доступно в пределах разметки компонента
    // this.sname = 'Step';
  }

  ngOnInit() {
  }

}
