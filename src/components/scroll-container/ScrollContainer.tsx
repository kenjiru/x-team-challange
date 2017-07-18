import * as classNames from "classnames";
import * as React from "react";
import {SyntheticEvent} from "react";

class ScrollContainer extends React.Component<IScrollContainerProps, IScrollContainerState> {
    /* tslint:disable:no-unused-variable */
    private static defaultProps: IScrollContainerProps = {
        canLoad: true,
        loadingThreshold: 200,
        displayThreshold: 0
    };
    /* tslint:enable:no-unused-variable */

    public render(): React.ReactElement<any> {
        return (
            <div className={this.getClassName()} onScroll={this.handleScroll}>
                {this.props.children}
            </div>
        );
    }

    private handleScroll = (ev: SyntheticEvent<any>): void => {
        let elem: any = ev.currentTarget;
        let elemScroll: number = elem.scrollTop + elem.clientHeight; // == elem.scrollHeight

        if (elem.scrollHeight - elemScroll <= this.props.displayThreshold) {
            this.props.onDisplay();
        } else if (elem.scrollHeight - elemScroll <= this.props.loadingThreshold) {
            if (this.props.canLoad) {
                this.props.onLoading();
            }
        }
    }

    private getClassName(): string {
        return classNames("scroll-container", this.props.className);
    }
}

interface IScrollContainerState {
}

interface IScrollContainerProps {
    className?: string;
    canLoad?: boolean;
    loadingThreshold?: number;
    displayThreshold?: number;
    onLoading?: () => void;
    onDisplay?: () => void;
}

export default ScrollContainer;
