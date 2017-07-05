import * as superagent from "superagent";
import * as prefix from "superagent-prefix";

import NdjsonUtil from "../util/NdjsonUtil";
import shopStore, {IProduct} from "../model/ShopStore";

const API_HOST: string = "http://localhost:8000";

export function getProducts(): void {
    superagent
        .get("/api/products")
        .use(prefix(API_HOST))
        .end((err: Error, res: superagent.Response): void => {
            const products: IProduct[] = NdjsonUtil.parse<IProduct>(res.text);

            shopStore.addAllItems(products);
        });
}
