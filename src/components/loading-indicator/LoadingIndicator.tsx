import * as React from "react";
import {ReactElement} from "react";
import {observer} from "mobx-react";

import {ShopStore} from "../../model/ShopStore";

class LoadingIndicator extends React.Component<ILoadingIndicatorProps, ILoadingIndicatorState> {
    public render(): React.ReactElement<any> {
        return (
            <div className="loading-indicator">
                {this.renderIndicator()}
            </div>
        );
    }

    private renderIndicator(): ReactElement<any> | undefined {
        const shopStore: ShopStore | undefined = this.props.shopStore;

        if (shopStore && shopStore.requestItemsCall.state === "pending") {
            return <span>Loading..</span>;
        }
    }
}

interface ILoadingIndicatorState {
}

interface ILoadingIndicatorProps {
    shopStore?: ShopStore;
}

export default observer(["shopStore"], LoadingIndicator);
