import * as _ from "lodash";
import * as React from "react";
import {ReactElement} from "react";

import StringUtil from "../../util/StringUtil";
import {SortType} from "../../model/ShopStore";

import "./SortOptions.less";

class SortOptions extends React.Component<ISortOptionsProps, ISortOptionsState> {
    private values: SortType[] = ["none", "id", "price", "size"];

    public render(): React.ReactElement<any> {
        return (
            <span className="sort-options">
                Sort by: {this.renderOptions()}
            </span>
        );
    }

    private renderOptions(): ReactElement<any>[] {
        return _.map(this.values, (value: SortType) => (
            <label key={value}>
                <input key={value} type="radio" value={value}
                       checked={value === this.props.sortField}
                       onChange={() => this.props.onSort(value)}/>
                {StringUtil.capitalize(value)}
            </label>
        ));
    }
}

interface ISortOptionsState {
}

interface ISortOptionsProps {
    onSort?: (sortField: SortType) => void;
    sortField?: SortType;
}

export default SortOptions;
