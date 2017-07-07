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
    private static PRODUCT_WIDTH: number = 160;
    private static PRODUCT_HEIGHT: number = 160;

    private containerWidth: number = 0;
    private containerHeight: number = 0;

    public componentDidMount(): void {
        console.log(this.state);

        let initialNumElements: number = this.determineInitialNumElements();

        this.props.shopStore.requestItems(initialNumElements);
        this.props.shopStore.addRequestedItems();
    }

    public render(): React.ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        return (
            <div className="product-list">
                <div className="summary">
                    Number of items:
                    <span className="num-items">{shopStore.items.length}</span>
                </div>
                <div ref={this.handleListRef}>
                    <ScrollContainer className="list"
                                     onLoading={this.handleLoading}
                                     canLoad={this.canLoad()}
                                     onDisplay={this.handleDisplay}>
                        {this.renderAllItems()}
                    </ScrollContainer>
                </div>
                <LoadingIndicator/>
                <button onClick={this.getProducts}>Get items</button>
            </div>
        );
    }

    private renderAllItems(): ReactElement<any>[] {
        return _.map(this.props.shopStore.items, this.renderItem);
    }

    private renderItem(product: IProduct): ReactElement<any> {
        return <ProductItem key={product.id} product={product} width={ProductList.PRODUCT_WIDTH}
                            height={ProductList.PRODUCT_HEIGHT}/>;
    }

    private handleListRef = (elem: any): any => {
        if (_.isNil(elem) === false) {
            this.containerWidth = elem.clientWidth;
            this.containerHeight = elem.clientHeight;
        }
    }

    private handleLoading = (): void => {
        this.props.shopStore.requestItems();
    }

    private handleDisplay = (): void => {
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

    private determineInitialNumElements(): number {
        const numItemsOnRow: number = Math.floor(this.containerWidth / ProductList.PRODUCT_WIDTH);
        const numRows: number = Math.ceil(this.containerHeight / ProductList.PRODUCT_HEIGHT);

        return numItemsOnRow * numRows;
    }
}

interface IProductListState {
    iteration: number;
}

export interface IProductListProps {
    shopStore?: ShopStore;
}

export default observer(["shopStore"], ProductList);
