import * as superagent from "superagent";
import * as prefix from "superagent-prefix";
import * as superagentPromise from "superagent-promise";

import NdjsonUtil from "../util/NdjsonUtil";
import {IProduct, SortType} from "../model/ShopStore";

superagentPromise(superagent);

const API_HOST: string = "http://localhost:8000";

export default class ApiService {
    public static getProducts(sortType: SortType = "none", limit: number = 0, skip: number = 0): Promise<IProduct[]> {
        const sort: string = sortType !== "none" ? sortType : undefined;

        return superagent
            .get("/api/products")
            .use(prefix(API_HOST))
            .query({limit, skip, sort})
            .then((res: superagent.Response): IProduct[] => {
                return NdjsonUtil.parse<IProduct>(res.text);
            });
    }
}
