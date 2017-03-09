class Fundamental {
    public id: number;
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
        public id: number, // protected specifying will create a local variable like if it was declared before constructor
                           // if inheritable variable has tha same name, it will be redeclared by one of parents class
                           // in this case local id: number will be created, but in Fundamental it will be redeclared with this.id = n
        public brand: string,
        public name: string,
        public imageUrl: string,
        public department: string[],
        public price: number,
        public desc: string
    ) {
        super(id, desc);
    }
}

// function item2(){} class Item1 {}

// let App: InventoryApp = new InventoryApp();
// App.run();

@Component({
    host: {
        'class' : 'root'
    }
    selector: 'inventory-app',
    // template: `
    //     <div class="inventory-app">
    //         <h1>{{ product.name }}</h1>
    //         <span>{{ product.brand }}</span>
    //     </div>
    // `
    template: `
        <div class="inventory-app">
            <product-list
                [productList]="products"
                (onProductSelected)="productWasSelected($event)"
            > <!-- 1. input; 2. output -->
            </product-list>
        </div>
    `
}) class InventoryApp {
    products: Product[];
    constructor() {
        this.products = [
            new Product(
                345,
                'Paradnaya FASHION',
                'Hat of Eight Clins',
                '/product/mah/8ch.png',
                ['Men', 'Accessories', 'Hats'],
                440,
                'Nice for everyday'
            ),
            new Product(
                345,
                'Shavuha Shmot',
                'Mantle',
                '/product/iac/mantle.png',
                ['It', 'Accessories', 'Coats'],
                440,
                '4 seasons if u are <= 16 y.o.'
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
    productWasSelected(product: Product): void {
        console.log('Product clicked: ', product);
    }

}

@Component({
    selector: 'product-list',
    template: `
        <div class="ui items">
            <product-row
                *ngFor = "let productItem of list"
                [product] = "item"
                (click) = " clicked(item) "
                [class.selected] = "isSelected(item)"
            >
                loading...
            </product-row>
        </div>
    `,
    inputs: ['list: productList'], // @Input('productList') list: string;
    outputs: ['onProducSelected']
}) class ProductList {
    list: Product[];
    onProducSelected: EventEmmiter<Product>;
    private currentProduct: Product;
    constructor() {
        this.onProducSelected = new EventEmmiter();
    }
    clicked( product: Product ): void {
        this.currentProduct = product;
        this.onProducSelected.emit(product);
    }
    isSelected( product: Product ): boolean { // if foo will return true, element will receive .selected
        if( !product || this.currentProduct ) {
            return false;
        }
        return product.id === this.currentProduct.id;
    }
}

@Component({
    host: {
        "class":"item"
    },
    input: ['pitem:product'],
    selector: 'product-row',
    template: `
        <product-image [product]="product"></product-image>
        <div class="content">
            <div class="header">{{ pitem.name }}</div>
            <div class="meta">
                <div class="product-brand">Brand: <b>{{ pitem.brand }}</b></div>
            </div>
            <div class="description">
                <product-department [product]="product"></product-department>
            </div>  
        </div>
        <price-display [price]="pitem.price" ></price-display>
    `,
}) class ProductRow {
    pitem: Product;
}

@Component({
    selector: 'product-image',
    host: {
        class: 'ui small image'
    },
    inputs: ['product'],
    template: `
        <img class="product-image" [src]="product.imageUrl">
    `
}) class ProductImage {
    product: Product;
}

@Component({
    selector: 'price-display',
    inputs: ['price'],
    template: `
        <div class="price-display">\${{ price }}</div>
    `
}) class PriceDisplay {
    price: number;
}

@Component({
    selector: 'product-department',
    inputs: ['product'],
    template: `
        <div class="product-department">
            <span *ngFor="let name of product.department; let i=index">
                <a href="#">{{ name }}</a>
                <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
            </span>
        </div>
    `
}) class ProductDepartment {
    product: Product;
}

// ---------------------------------- NG
@NgModule({
    declarations: [
        InventoryApp,
        ProductImage,
        ProductDepartment,
        PriceDisplay,
        ProductRow,
        ProductList
    ],
    imports: [
        BrowserModule
    ],
    bootstrap: [
        InventoryApp
    ]
}) class ShopModule {

}

platformBrowserDynamic().bootstrapModule( ShopModule );