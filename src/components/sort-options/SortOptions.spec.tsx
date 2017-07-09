import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {expect} from "chai";
import * as sinon from "sinon";
import {SinonSpy} from "sinon";

import SortOptions, {ISortOptionsProps} from "./SortOptions";

describe("<ProductItem/>", () => {
    describe("content", () => {
        it("has all the radio buttons corresponding to the values", () => {
            const wrapper: ShallowWrapper<SortOptions, ISortOptionsProps> =
                shallow(<SortOptions onSort={() => {
                }}/>);

            expect(wrapper.find("label")).to.have.length(4);

            expect(wrapper.containsMatchingElement(
                <label><input type="radio" value="none"/>None</label>)).to.equal(true);
            expect(wrapper.containsMatchingElement(
                <label><input type="radio" value="id"/>Id</label>)).to.equal(true);
            expect(wrapper.containsMatchingElement(
                <label><input type="radio" value="price"/>Price</label>)).to.equal(true);
            expect(wrapper.containsMatchingElement(
                <label><input type="radio" value="size"/>Size</label>)).to.equal(true);
        });

        it("calls the onSort callback when clicking on radio button ", () => {
            const onSortSpy: SinonSpy = sinon.spy();
            const wrapper: ShallowWrapper<SortOptions, ISortOptionsProps> =
                shallow(<SortOptions onSort={onSortSpy}/>);

            const noneRadio: ShallowWrapper<any, any> = wrapper.find("input[value='none']");
            expect(noneRadio).to.have.length(1);

            noneRadio.simulate("change", {target: {checked: true}});
            expect(onSortSpy.called).to.equal(true);
            expect(onSortSpy.calledWith("none")).to.equal(true);
        });
    });
});
