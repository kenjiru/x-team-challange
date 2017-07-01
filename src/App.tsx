import * as React from "react";
import {ReactElement} from "react";

import "./App.less";

class App extends React.Component<any, any> {
    public render(): ReactElement<any> {
        return (
            <div className="app">
                <h1>App title</h1>
                <div>App content</div>
            </div>
        );
    }
}

export default App;
