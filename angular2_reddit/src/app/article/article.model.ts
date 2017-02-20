export class Article {
  title: string;
  link: string;
  votes: number;

  constructor( title: string, link: string, votes?: number ) { // ? optional
    this.title = title;
    this.link = link;
    this.votes = votes || 0; // value or 0 by default
  }

  voteUp(): void {
    this.votes +=1;
  }

  voteDown(): void { // void - no returns
    if ( this.votes > 0 ) this.votes -= 1;
  }

  domain(): string {
    try {
      const link: string = this.link.split('//')[1];
      return link.split('/')[0];
    } catch(err) {
      console.log(err);
      return null
    }
  }

}
