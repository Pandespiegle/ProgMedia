export class Product{
    id?: number;
    name: string;
    quantity: string;
    checked: boolean;
    list_id: string;

    constructor(){
        this.name = '';
        this.quantity = '';
        this.checked = false;
        this.list_id = '';
    }

}