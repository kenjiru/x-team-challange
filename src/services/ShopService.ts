import * as superagent from "superagent";
import * as superagentPromise from "superagent-promise";

superagentPromise(superagent);

import shopStore, {IProduct} from "../model/ShopStore";
import ApiService from "./ApiService";

export default class ShopService {
    public static getProducts(): void {
        ApiService.getProducts().then((products: IProduct[]) => {
            shopStore.addAllItems(products);
        });
    }
}
