import * as superagent from "superagent";
import * as superagentPromise from "superagent-promise";

superagentPromise(superagent);

import shopStore, {IProduct} from "../model/ShopStore";
import ApiService from "./ApiService";

class ShopService {
    private static LIMIT: number = 20;
    private retrieved: number = 0;

    public getProducts(limit: number = ShopService.LIMIT): void {
        ApiService.getProducts(this.retrieved, limit).then((products: IProduct[]) => {
            shopStore.addAllItems(products);
        });

        this.retrieved += limit;
    }
}

let shopService: ShopService = new ShopService();

export default shopService;
