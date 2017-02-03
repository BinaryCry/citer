import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.component.html', // or template: ``
  styleUrls: ['./hello-world.component.css']
}) export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
