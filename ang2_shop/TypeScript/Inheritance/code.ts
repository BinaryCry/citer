class Report {
  data: string[];

  constructor(arr: Array<string>) {
    this.data = arr;
  }
  run():void {
    console.log(this.data.join(', '));
  }
}

class ExtReport extends Report {
  header: string;
  constructor(str: string, arr: string[]) {
    super(arr);
    this.header = str;
  }
  run() {
    console.log(this.header);
    super.run();
  }
}

let R: ExtReport = new ExtReport('Header', ['Notice','Access is allowed', 'Orange']);
R.run();