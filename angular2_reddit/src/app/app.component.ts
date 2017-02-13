import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) export class AppComponent {

  addArticle( title: HTMLInputElement, link: HTMLInputElement ): boolean {
    console.log(`Adding article: ${title.value} and link: ${link.value}`);
    // console.log(title); // input html-element
    // console.log(this); // this в данном случае вернет все { имя: значение }, которые использовались в элементе с помощью {{}}
    return false;
  }

  submitBtnText: string;
  status: number;

  constructor() {
   this.submitBtnText = 'Submit';
   this.status = 1;
  }

}
