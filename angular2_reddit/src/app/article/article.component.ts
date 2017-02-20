import {Component, OnInit, Input} from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  host: {
    class: 'row',
    title: 'test'
  }
}) export class ArticleComponent implements OnInit {
  @Input() article: Article;

  constructor() {
    // this.article = new Article(
    //   'Angular 2',
    //   'http://angular.io');
  }

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article.voteDown();
    return false; // disable link
  }

  ngOnInit() {
  }

}


// -----------
// export class ArticleComponent implements OnInit {
//
//   votes: number;
//   title: string;
//   link: string;
//
//   constructor() {
//     this.title = 'Angular 2';
//     this.link = 'http://angilar.io';
//     this.votes = 0;
//   }
//
//   voteUp() {
//     this.votes += 1;
//     return false; // disable link
//   }
//   voteDown() {
//     if ( this.votes > 0 ) this.votes -= 1;
//     return false; // disable link
//   }
//
//   ngOnInit() {
//
//   }
//
// }
