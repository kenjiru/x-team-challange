import {useStrict, observable, action} from "mobx";

useStrict(true);

export class ShopStore {
    @observable private storeItems: IProduct[] = [];

    public get items(): IProduct[] {
        return this.storeItems;
    }

    @action
    public addItem(item: IProduct): void {
        this.storeItems.push(item);
    }
}

export interface IProduct {
    id: string;
    size: number;
    price: number;
    date: string;
}

const shopStore: ShopStore = new ShopStore();
export default shopStore;
