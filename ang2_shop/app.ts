class Fundamental {
    protected id: number;
    protected constructor( n: number ) {
        this.id = n;
    }
}
class Item extends Fundamental {
    desc: string;
    constructor(
        id: number,
        str: string
    ) {
        super( id );
        this.desc = str;
    }
}
class Product extends Item {
    constructor(
        protected id: number, // protected specifying will create a local variable like if it was declared before constructor
                              // if inheritable variable has tha same name, it will be redeclared by one of parents class
                              // in this case local id: number will be created, but in Fundamental it will be redeclared with this.id = n
        public sku: string,
        public name: string,
        public imageUrl: string,
        public department: string[],
        public price: number,
        public desc: string
    ) {
        super(id, desc);
    }
}

class InventoryApp {
    products: Product[];
    constructor() {
        this.products = [
            new Product(
                345,
                'Paradnaya FASHION',
                'Eight Clins Hat',
                '/product/mah/8ch.png',
                ['Men', 'Accessories', 'Hats'],
                440,
                'Nice for everyday'
            ),
            new Product(
                345,
                'Shavuha Shmot',
                'Coat',
                '/product/iac/coat.png',
                ['It', 'Accessories', 'Coats'],
                440,
                '4 seasons'
            ),
            new Product(
                345,
                'Piter Shoes',
                'Red Makasins',
                '/product/mas/rm.png',
                ['Men', 'Accessories', 'Shoes'],
                440,
                'Nice if u have many watermellons and trade point'
            )
        ];
    }
    run():void {
        console.log(this.products);
    }
}

let App: InventoryApp = new InventoryApp();
App.run();

@Component({
    selector: 'inventory-app',
    template: `
        <div class="inventory-app">
            <h1>{{ product.name }}</h1>
            <span>{{ product.sku }}</span>
        </div>
    `
})

