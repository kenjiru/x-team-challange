import * as React from "react";
import AdService from "../../services/AdService";

import "./AdItem.less";

class AdItem extends React.Component<IAdItemProps, IAdItemState> {
    public render(): React.ReactElement<any> {
        return (
            <div className="ad-item">
                <div className="ad-container">
                    <img className="ad" src={this.getAdUrl()}/>
                </div>
            </div>
        );
    }

    private getAdUrl(): string {
        return `http://localhost:8000/ad/?r=${AdService.getAdId(this.props.place)}`;
    }
}

interface IAdItemState {
}

interface IAdItemProps {
    place?: number;
}

export default AdItem;
