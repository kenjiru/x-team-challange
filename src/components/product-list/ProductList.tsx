import * as _ from "lodash";
import * as React from "react";
import {EventHandler, MouseEvent, ReactElement} from "react";
import {observer} from "mobx-react";

import ShopService from "../../services/ShopService";
import {IProduct, ShopStore} from "../../model/ShopStore";
import ProductItem from "../product-item/ProductItem";

export class ProductList extends React.Component<IProductListProps, IProductListState> {
    public render(): React.ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        return (
            <div className="item-list">
                <div className="summary">
                    Number of items:
                    <span className="num-items">{shopStore.items.length}</span>
                </div>
                <div className="list">
                    {this.renderAllItems()}
                </div>
                <button onClick={this.handleAddItem}>Add item</button>
                <button onClick={this.getProducts}>Get items</button>
            </div>
        );
    }

    private renderAllItems(): ReactElement<any>[] {
        return _.map(this.props.shopStore.items, this.renderItem);
    }

    private renderItem(product: IProduct): ReactElement<any> {
        return <ProductItem product={product}/>;
    }

    private getProducts(): void {
        ShopService.getProducts();
    }

    private handleAddItem: EventHandler<MouseEvent<any>> = (ev: MouseEvent<any>): void => {
        this.props.shopStore.addItem(this.createDummyItem());
    }

    private createDummyItem(): IProduct {
        return {
            id: "foo",
            size: 36,
            price: 16.45,
            face: "( ͡° ͜ʖ ͡°)",
            date: "Sun Jul 02 2017 05:49:02 GMT+0200 (CEST)"
        };
    }
}

interface IProductListState {
}

export interface IProductListProps {
    shopStore: ShopStore;
}

export default observer(["shopStore"], ProductList);
