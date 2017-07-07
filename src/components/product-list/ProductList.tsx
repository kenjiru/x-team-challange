import * as _ from "lodash";
import * as React from "react";
import {ReactElement} from "react";
import {observer} from "mobx-react";

import {IProduct, ShopStore} from "../../model/ShopStore";
import ProductItem from "../product-item/ProductItem";
import LoadingIndicator from "../loading-indicator/LoadingIndicator";
import ScrollContainer from "../scroll-container/ScrollContainer";

import "./ProductList.less";

export class ProductList extends React.Component<IProductListProps, IProductListState> {
    public render(): React.ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        return (
            <div className="product-list">
                <div className="summary">
                    Number of items:
                    <span className="num-items">{shopStore.items.length}</span>
                </div>
                <ScrollContainer className="list" onLoading={this.handleLoading}
                                 canLoad={this.canLoad()}
                                 onDisplay={this.handleDisplay}>
                    {this.renderAllItems()}
                </ScrollContainer>
                <LoadingIndicator/>
                <button onClick={this.getProducts}>Get items</button>
            </div>
        );
    }

    private renderAllItems(): ReactElement<any>[] {
        return _.map(this.props.shopStore.items, this.renderItem);
    }

    private renderItem(product: IProduct): ReactElement<any> {
        return <ProductItem key={product.id} product={product}/>;
    }

    private handleLoading = (): void => {
        console.log("handleLoading");
        this.props.shopStore.requestItems();
    }

    private handleDisplay = (): void => {
        console.log("handleDisplay");
        this.props.shopStore.addRequestedItems();
    }

    private canLoad(): boolean {
        let requestItemsCall: any = this.props.shopStore.requestItemsCall;

        return _.isNil(requestItemsCall.value) && requestItemsCall.state !== "pending";
    }

    private getProducts = (): void => {
        this.props.shopStore.requestItems();
        this.props.shopStore.addRequestedItems();
    }
}

interface IProductListState {
    iteration: number;
}

export interface IProductListProps {
    shopStore?: ShopStore;
}

export default observer(["shopStore"], ProductList);
