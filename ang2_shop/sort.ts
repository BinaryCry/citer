class Famale {
    name: string;
    protected age: number;
    constructor(str: string, n: number) {
        this.name = str;
        this.age = n;
    }
}
class Sort {
    valid: Famale[] = [];
    women: Famale[] = [];
    constructor(
        private arr: any
    ) {
        for (let i in arr) {
            arr.hasOwnProperty(i) ? this.women.push( new Famale( arr[i][0], arr[i][1] ) ) : 0;
        }
    }
    validation() {
        for (let j in this.women) {
            if( !this.women.hasOwnProperty(j) ) return false;
            this.women[j]['age'] > 18 && this.women[j]['age'] < 30 ? this.valid.push(this.women[j]) : 0;
        }
        console.log('Can be employee for the season work in restaurant: ');
        console.log(this.valid);
    }
}

let woman: any[] = [
    [ 'Alisa', 23 ],
    [ 'Masha', 15 ],
    [ 'Zuhra', 58 ]
];
let O = new Sort(woman);
O.validation();