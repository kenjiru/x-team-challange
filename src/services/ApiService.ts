import * as superagent from "superagent";
import * as prefix from "superagent-prefix";
import * as superagentPromise from "superagent-promise";

import NdjsonUtil from "../util/NdjsonUtil";
import {IProduct} from "../model/ShopStore";

superagentPromise(superagent);

const API_HOST: string = "http://localhost:8000";

export default class ApiService {
    public static getProducts(skip: number = 0, limit: number = 0): Promise<IProduct[]> {
        return superagent
            .get("/api/products")
            .use(prefix(API_HOST))
            .query({limit, skip})
            .then((res: superagent.Response): IProduct[] => {
                return NdjsonUtil.parse<IProduct>(res.text);
            });
    }
}
