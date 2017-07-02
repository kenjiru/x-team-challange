import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {expect} from "chai";

import {ShopStore} from "../../model/ShopStore";
import {ProductList, IProductListProps} from "./ProductList";

describe("<ProductList/>", () => {
    describe("content", () => {
        it("has the correct children", () => {
            const shopStore: ShopStore = new ShopStore();
            const wrapper: ShallowWrapper<ProductList, IProductListProps> =
                shallow(<ProductList shopStore={shopStore}/>);

            expect(wrapper.find(".summary")).to.have.length(1);
            expect(wrapper.find(".num-items")).to.have.length(1);
            expect(wrapper.find("button")).to.have.length(1);
        });

        it("displays the number of items", () => {
            const shopStore: ShopStore = new ShopStore();
            const wrapper: ShallowWrapper<ProductList, IProductListProps> =
                shallow(<ProductList shopStore={shopStore}/>);

            expect(wrapper.contains(<span className="num-items">{0}</span>)).to.equal(true);
        });
    });
});
