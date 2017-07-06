import {useStrict, observable, action} from "mobx";
import {fromPromise} from "mobx-utils";

import ApiService from "../services/ApiService";

useStrict(true);

export class ShopStore {
    private static LIMIT: number = 5;

    @observable public items: IProduct[] = [];
    @observable public requestItemsCall: any = fromPromise(Promise.resolve("foo"));

    @action
    public addItem(item: IProduct): void {
        this.items.push(item);
    }

    @action
    public requestItems(limit: number = ShopStore.LIMIT): void {
        let requestPromise: Promise<IProduct[]> = ApiService.getProducts(this.items.length, limit);

        this.requestItemsCall = fromPromise(requestPromise.then(this.handleRequestItems));
    }

    @action
    private handleRequestItems = (products: IProduct[]): void => {
        this.items.push(...products);
    }
}

export interface IProduct {
    id: string;
    size: number;
    price: number;
    face: string;
    date: string;
}

const shopStore: ShopStore = new ShopStore();
export default shopStore;
