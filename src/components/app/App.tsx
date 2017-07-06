import * as React from "react";
import {ReactElement} from "react";
import {Provider} from "mobx-react";

import ProductList from "../product-list/ProductList";
import shopStore from "../../model/ShopStore";

class App extends React.Component<any, any> {
    public render(): ReactElement<any> {
        return (
            <Provider shopStore={shopStore}>
                <div className="app">
                    <h1>Discount Ascii Warehouse</h1>

                    <ProductList />
                </div>
            </Provider>
        );
    }
}

export default App;
