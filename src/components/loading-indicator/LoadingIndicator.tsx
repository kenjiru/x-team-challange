import * as React from "react";

import "./LoadingIndicator.less";

class LoadingIndicator extends React.Component<ILoadingIndicatorProps, ILoadingIndicatorState> {
    public render(): React.ReactElement<any> {
        return (
            <div className="loading-indicator"></div>
        );
    }
}

interface ILoadingIndicatorState {
}

interface ILoadingIndicatorProps {
}

export default LoadingIndicator;
