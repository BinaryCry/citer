export class App {

  submitBtnText: string;
  status: number;

  constructor(submitBtnText: string, status?: number) {
    this.submitBtnText = submitBtnText;
    this.status = status || 0;
  }

  genNewArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log( title.value && link.value ? `Adding article: ${title.value} and link: ${link.value}` : 'no entry or not all data' );
  }

}
