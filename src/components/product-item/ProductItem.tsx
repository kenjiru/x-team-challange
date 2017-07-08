import * as React from "react";

import DateUtil from "../../util/DateUtil";
import NumberUtil from "../../util/NumberUtil";
import {IProduct} from "../../model/ShopStore";

import "./ProductItem.less";

class ProductItem extends React.Component<IProductItemProps, IProductItemState> {
    public render(): React.ReactElement<any> {
        return (
            <div className="product-item" style={this.getItemStyle()}>
                <div className="face" style={this.getFaceStyle()}>{this.props.product.face}</div>
                <div className="id">
                    <span className="label">id: </span>{this.props.product.id}
                </div>
                <div className="price">
                    <span className="label">price: </span>{this.getPrice()}
                </div>
                <div className="date">
                    <span className="label">added: </span>{this.getDate()}
                </div>
            </div>
        );
    }

    private getPrice(): string {
        return NumberUtil.formatCurrency(this.props.product.price);
    }

    private getItemStyle(): Object {
        return {
            height: this.props.height,
            width: this.props.width
        };
    }

    private getFaceStyle(): Object {
        return {
            fontSize: this.props.product.size
        };
    }

    private getDate(): string {
        return DateUtil.formatDate(this.props.product.date);
    }
}

interface IProductItemState {
}

export interface IProductItemProps {
    product: IProduct;
    width: number;
    height: number;
}

export default ProductItem;
