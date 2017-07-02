import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {expect} from "chai";

import ProductList from "../product-list/ProductList";
import App from "./App";

describe("<App/>", () => {
    describe("contents", () => {
        it("has a class assigned to it", () => {
            const wrapper: ShallowWrapper<App, any> = shallow(<App/>);

            expect(wrapper.find(".app")).to.have.length(1);
        });

        it("has a h1 element", () => {
            const wrapper: ShallowWrapper<App, any> = shallow(<App/>);

            expect(wrapper.find("h1")).to.have.length(1);
        });

        it("has an item list", () => {
            const wrapper: ShallowWrapper<App, any> = shallow(<App/>);

            expect(wrapper.find(ProductList)).to.have.length(1);
        });
    });
});
