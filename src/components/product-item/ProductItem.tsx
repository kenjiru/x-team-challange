import * as React from "react";
import {IProduct} from "../../model/ShopStore";

import "./ProductItem.less";

class ProductItem extends React.Component<IProductItemProps, IProductItemState> {
    public render(): React.ReactElement<any> {
        let style: object = {
            fontSize: this.props.product.size
        };

        return (
            <div className="product-item">
                <div className="face" style={style}>{this.props.product.face}</div>
                <div className="id">id: {this.props.product.id}</div>
                <div className="price">price: {this.props.product.price}</div>
                <div className="date">added: {this.getDate()}</div>
            </div>
        );
    }

    private getDate(): string {
        return this.props.product.date;
    }
}

interface IProductItemState {
}

export interface IProductItemProps {
    product: IProduct;
}

export default ProductItem;
