import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {expect} from "chai";

import {IProduct} from "../../model/ShopStore";
import ProductItem, {IProductItemProps} from "./ProductItem";

describe("<ProductItem/>", () => {
    describe("content", () => {
        it("has the correct children", () => {
            const product: IProduct = {
                id: "foo",
                face: "( ͡° ͜ʖ ͡°)",
                size: 16,
                price: 16.45,
                date: "Wed Jul 05 2017 08:18:16 GMT+0200 (CEST)"
            };

            const wrapper: ShallowWrapper<ProductItem, IProductItemProps> =
                shallow(<ProductItem product={product} width={160} height={160}/>);

            expect(wrapper.find(".id")).to.have.length(1);
            expect(wrapper.find(".face")).to.have.length(1);
            expect(wrapper.find(".price")).to.have.length(1);
            expect(wrapper.find(".date")).to.have.length(1);
        });
    });
});
