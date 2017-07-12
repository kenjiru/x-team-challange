import * as _ from "lodash";
import * as React from "react";
import {ReactElement} from "react";
import {observer} from "mobx-react";

import {IProduct, ShopStore, SortType} from "../../model/ShopStore";
import AdService from "../../services/AdService";

import ProductItem from "../product-item/ProductItem";
import AdItem from "../ad-item/AdItem";
import LoadingIndicator from "../loading-indicator/LoadingIndicator";
import ScrollContainer from "../scroll-container/ScrollContainer";
import SortOptions from "../sort-options/SortOptions";

import "./ProductList.less";

export class ProductList extends React.Component<IProductListProps, IProductListState> {
    private static PRODUCT_WIDTH: number = 160;
    private static PRODUCT_HEIGHT: number = 160;

    private containerWidth: number = 0;
    private containerHeight: number = 0;

    public state: IProductListState = {
        sortField: "none"
    };

    public componentDidMount(): void {
        let initialNumElements: number = this.determineInitialNumElements();

        this.props.shopStore.requestItems(this.state.sortField, initialNumElements);
        this.props.shopStore.addRequestedItems();
    }

    public render(): React.ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        return (
            <div className="product-list">
                <div>
                    <span className="summary">
                        Number of items:
                        <span className="num-items">{shopStore.items.length}</span>
                    </span>
                    <SortOptions onSort={this.handleSort} sortField={this.state.sortField}/>
                </div>
                <div className="list-container" ref={this.handleListRef}>
                    <ScrollContainer className="list"
                                     onLoading={this.handleLoading}
                                     canLoad={this.canLoad()}
                                     onDisplay={this.handleDisplay}>
                        {this.renderAllItems()}
                    </ScrollContainer>
                    {this.renderLoadingIndicator()}
                    {this.renderLoadingError()}
                    {this.renderEndOfList()}
                </div>
            </div>
        );
    }

    private renderAllItems(): ReactElement<any>[] {
        return _.reduce(this.props.shopStore.items,
            (result: ReactElement<any>[], product: IProduct): ReactElement<any>[] => {
                if ((result.length + 1) % AdService.AD_FREQUENCY === 0) {
                    result.push(<AdItem key={"ad-" + result.length} place={result.length}/>);
                }
                result.push(this.renderItem(product));

                return result;
            }, []);
    }

    private renderItem(product: IProduct): ReactElement<any> {
        return <ProductItem key={product.id} product={product} width={ProductList.PRODUCT_WIDTH}
                            height={ProductList.PRODUCT_HEIGHT}/>;
    }

    private renderLoadingIndicator(): ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        if (shopStore.requestItemsCall.state === "pending") {
            return <LoadingIndicator/>;
        }
    }

    private renderLoadingError(): ReactElement<any> {
        const shopStore: ShopStore = this.props.shopStore;

        if (shopStore.requestItemsCall.state === "rejected") {
            const error: Error = shopStore.requestItemsCall.value;

            return (
                <div className="error-container">Error loading items: {error.message}</div>
            );
        }
    }

    private renderEndOfList(): ReactElement<any> {
        if (this.props.shopStore.hasMore === false) {
            return <div className="end-of-catalogues">~ end of catalogue ~</div>;
        }
    }

    private handleSort = (sortField: SortType): void => {
        this.setState({
            sortField
        });

        this.props.shopStore.requestItems(sortField, this.props.shopStore.items.length, 0);
        this.props.shopStore.replaceWithRequestedItems();
    }

    private handleListRef = (elem: any): any => {
        if (_.isNil(elem) === false) {
            this.containerWidth = elem.clientWidth;
            this.containerHeight = elem.clientHeight;
        }
    }

    private handleLoading = (): void => {
        if (this.props.shopStore.hasMore) {
            this.props.shopStore.requestItems(this.state.sortField);
        }
    }

    private handleDisplay = (): void => {
        this.props.shopStore.addRequestedItems();
    }

    private canLoad(): boolean {
        let requestItemsCall: any = this.props.shopStore.requestItemsCall;

        return _.isNil(requestItemsCall.value) && requestItemsCall.state !== "pending";
    }

    private determineInitialNumElements(): number {
        const numItemsOnRow: number = Math.floor(this.containerWidth / ProductList.PRODUCT_WIDTH);
        const numRows: number = Math.ceil(this.containerHeight / ProductList.PRODUCT_HEIGHT);
        const numTotal: number = numItemsOnRow * numRows;
        const numAds: number = Math.floor(numTotal / AdService.AD_FREQUENCY);

        return numTotal - numAds;
    }
}

interface IProductListState {
    sortField?: SortType;
}

export interface IProductListProps {
    shopStore?: ShopStore;
}

export default observer(["shopStore"], ProductList);
