import {useStrict, observable, action} from "mobx";
import {fromPromise} from "mobx-utils";

import ApiService from "../services/ApiService";

useStrict(true);

export class ShopStore {
    private static LIMIT: number = 20;

    private isResultHandled: boolean = false;

    @observable public items: IProduct[] = [];
    @observable public requestItemsCall: any = fromPromise(Promise.resolve(null));

    @action
    public addItem(item: IProduct): void {
        this.items.push(item);
    }

    @action
    public requestItems(sortType: SortType = "none", limit: number = ShopStore.LIMIT, skip: number = -1): void {
        if (skip === -1) {
            skip = this.items.length;
        }

        let requestPromise: Promise<IProduct[]> = ApiService.getProducts(sortType, limit, skip);

        this.requestItemsCall = fromPromise(requestPromise);
        this.isResultHandled = false;
    }

    @action
    public replaceWithRequestedItems(): void {
        if (this.isResultHandled === false) {
            this.requestItemsCall.promise.then(this.handleReplaceItems);
            this.isResultHandled = true;
        }
    }

    @action
    public addRequestedItems(): void {
        if (this.isResultHandled === false) {
            this.requestItemsCall.promise.then(this.handleAddItems);
            this.isResultHandled = true;
        }
    }

    @action
    private handleReplaceItems = (products: IProduct[]): void => {
        this.items = products;
        this.requestItemsCall = fromPromise(Promise.resolve(null));
    }

    @action
    private handleAddItems = (products: IProduct[]): void => {
        this.items.push(...products);
        this.requestItemsCall = fromPromise(Promise.resolve(null));
    }
}

export interface IProduct {
    id: string;
    size: number;
    price: number;
    face: string;
    date: string;
}

export type SortType = "none" | "id" | "size" | "price";

const shopStore: ShopStore = new ShopStore();
export default shopStore;
