import { Component } from '@angular/core';
import { App } from './app.model';
import { Article } from "./article/article.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) export class AppComponent {
  app: App;
  articles: Article[]; // Array<Article>

  constructor() {
    this.app = new App( 'Submit', 5 );

    this.articles = [
      new Article('Angular', 'http://angulari.io'),
      new Article('FullStack', 'http://fullastack.io'),
      new Article('NodeJS', 'http://nodejs.org')
    ];

  }

  addArticle( title: HTMLInputElement, link: HTMLInputElement ): boolean {
    this.app.genNewArticle(title, link);

    this.articles.push( new Article( title.value, link.value, 0 ) );
    title.value = ''; link.value = ''; // clean fields
    return false;

    // console.log(title); // input html-element
    // console.log(this); // this в данном случае вернет все { имя: значение }, которые использовались в элементе с помощью {{}} // в данном случае, в кнопке
  }

  sortingArticles(): Array<Article> {
    return this.articles.sort( (a: Article, b: Article) => b.votes - a.votes );
  }

}
