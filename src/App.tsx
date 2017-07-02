import * as React from "react";
import {ReactElement} from "react";
import * as ReactDOM from "react-dom";

import "./App.less";

class App extends React.Component<any, any> {
    public render(): ReactElement<any> {
        return (
            <div>
                <h1>App title</h1>
                <div>App content</div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
