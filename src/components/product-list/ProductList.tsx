import * as React from "react";
import {EventHandler, MouseEvent} from "react";
import {observer} from "mobx-react";

import {IProduct, ShopStore} from "../../model/ShopStore";

export class ProductList extends React.Component<IProductListProps, IProductListState> {
    public render(): React.ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        return (
            <div className="item-list">
                <div className="summary">
                    Number of items:
                    <span className="num-items">{shopStore.items.length}</span>
                </div>
                <button onClick={this.handleAddItem}>Add item</button>
            </div>
        );
    }

    private handleAddItem: EventHandler<MouseEvent<any>> = (ev: MouseEvent<any>): void => {
        this.props.shopStore.addItem(this.createDummyItem());
    }

    private createDummyItem(): IProduct {
        return {
            id: "foo",
            size: 16,
            price: 16.45,
            date: "01-07-2017"
        };
    }
}

interface IProductListState {
}

export interface IProductListProps {
    shopStore: ShopStore;
}

export default observer(["shopStore"], ProductList);
