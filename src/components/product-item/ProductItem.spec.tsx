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
                size: 16,
                price: 16.45,
                date: "01-07-2017"
            };

            const wrapper: ShallowWrapper<ProductItem, IProductItemProps> =
                shallow(<ProductItem product={product}/>);

            expect(wrapper.contains(<span className="id">id: foo</span>)).to.equal(true);
            expect(wrapper.contains(<span className="size">size: {16}</span>)).to.equal(true);
            expect(wrapper.contains(<span className="price">price: {16.45}</span>)).to.equal(true);
            expect(wrapper.contains(<span className="date">date: 01-07-2017</span>)).to.equal(true);
        });
    });
});
