import {expect} from "chai";

import {ShopStore} from "./ShopStore";

describe("ShopStore", () => {
    describe("initial state", () => {
        let shopStore: ShopStore = new ShopStore();

        before(() => {
            shopStore = new ShopStore();
        });

        it("has 0 items initially", () => {
            expect(shopStore.items).to.have.length(0);
        });

        it("adds an item to the store", () => {
            shopStore.addItem({
                id: "foo",
                size: 16,
                price: 16.45,
                face: "( ͡° ͜ʖ ͡°)",
                date: "Mon Jun 19 2017 11:30:43 GMT+0200 (CEST)"
            });

            expect(shopStore.items).to.have.length(1);
        });
    });
});
