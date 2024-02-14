export class Product{
    id?: number;
    name: string;
    quantity: string;
    checked: boolean;
    code: string;

    constructor(){
        this.name = '';
        this.quantity = '';
        this.checked = false;
        this.code = '';
    }

}